import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { dataSource } from './auth.env';
var cors = require('cors')

async function bootstrap() {
  console.log('envData====>>',dataSource)
  const app = await NestFactory.create(AppModule);
  app.use(cors({origin:'*'}))

  const configService = app.get(ConfigService);

const port =process.env.APP_PORT ?? 3000
  await app.listen(port);
  console.warn(`Auth app is running in the [http://localhost:${port}]`)
}
bootstrap();
