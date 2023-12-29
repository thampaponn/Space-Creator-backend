import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { configureSwaggerDocs } from './helpers/configure-swagger-docs.helper';
import { initializeApp } from "firebase/app";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api');

  configureSwaggerDocs(app, configService);

  app.enableCors({
    origin: configService.get<string>('ENDPOINT_CORS'),
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  });

  const port = configService.get<number>('NODE_API_PORT') || '3000';
  await app.listen(port);
  Logger.log(`Url for OpenApi: ${await app.getUrl()}/docs`, 'Swagger');

  // Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAthRskSqSKwvyEVPSvIB3WylTFMhgvj1w",
    authDomain: "space-creator-ca3cf.firebaseapp.com",
    projectId: "space-creator-ca3cf",
    storageBucket: "space-creator-ca3cf.appspot.com",
    messagingSenderId: "150561976779",
    appId: "1:150561976779:web:6d8c239d6af567c109c64e"
  };

  const firebase = initializeApp(firebaseConfig);
}
bootstrap();
