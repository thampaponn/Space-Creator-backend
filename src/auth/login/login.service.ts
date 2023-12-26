import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UserService } from 'src/users/users.service';
import { HashingService } from 'src/shared/hashing/hashing.service';
import { Users } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JWTPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConiguration: ConfigType<typeof jwtConfig>,
    private readonly hashService: HashingService,
  ) {}

  private async generateTokens(user: Users) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<JWTPayload>>(
        user._id,
        this.jwtConiguration.accessTokenTtl,
        { email: user.email },
      ),
      this.signToken(user._id, this.jwtConiguration.refreshTokenTtl),
    ]);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConiguration.audience,
        issuer: this.jwtConiguration.issuer,
        secret: this.jwtConiguration.secret,
        expiresIn,
      },
    );
  }

  public async refreshToken(refreshToken: RefreshTokenDto) {
    try {
      const { id } = await this.jwtService.verifyAsync<Pick<JWTPayload, 'id'>>(
        refreshToken.refreshToken,
        {
          secret: this.jwtConiguration.secret,
          audience: this.jwtConiguration.audience,
          issuer: this.jwtConiguration.issuer,
        },
      );
      const user = await this.userService.findBySub(id);
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  public async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findOneByEmail(loginDto.email);
      if (!user) {
        throw new UnauthorizedException('User is not exists');
      }

      const passwordIsValid = await this.hashService.compare(
        loginDto.password,
        user.password,
      );

      if (!passwordIsValid) {
        throw new UnauthorizedException('Password is invalid');
      }

      return await this.generateTokens(user);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(HttpStatus.BAD_REQUEST, error);
    }
  }
}
