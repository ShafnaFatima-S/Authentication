import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { dataSource } from './auth.env';

async function bootstrap() {
  console.log('envData====>>',dataSource)
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
