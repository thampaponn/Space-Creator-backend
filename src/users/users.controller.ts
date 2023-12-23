import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
import { AccountsUser } from './interface/accounts-users-inferface';
import { AuthGuard } from 'src/auth/login/decorators/auth-guard.decorator';
import { AuthType } from 'src/auth/login/enum/auth-type.enum';
import { AccessTokenGuard } from 'src/auth/login/guards/access-token/access-token.guard';

@ApiTags('users')
@AuthGuard(AuthType.Bearer)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get('/:id')
  public async findOneUser(
    @Param('id') id: string,
  ): Promise<AccountsUser> {
    return this.usersService.findById(id);
  }
}
