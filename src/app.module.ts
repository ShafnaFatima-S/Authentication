import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthApp } from './auth.entities';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import { ConfigModule } from '@nestjs/config';
import { dataSource } from './auth.env';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource),
    TypeOrmModule.forFeature([AuthApp]),
    ConfigModule.forRoot({
        isGlobal:true,
        envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRY },
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
