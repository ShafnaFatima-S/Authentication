import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthApp } from './auth.entities';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'shaf123',
      database: 'postgres',
      entities: [AuthApp],
      synchronize: true,
    }),TypeOrmModule.forFeature([AuthApp]),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
