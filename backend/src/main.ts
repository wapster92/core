import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';
import { AppModule } from './app.module';
import { config } from 'dotenv-flow';
import { join } from 'path';

config({
  purge_dotenv: true,
  silent: true,
  path: join(__dirname, '..', '..'),
});

CrudConfigService.load({
  params: {
    slug: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    exclude: ['createManyBase'],
  },
});
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('/api');
  app.enableCors({ credentials: true, origin: '*' });
  const config = new DocumentBuilder()
    .setTitle('Core')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('core')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.BACKEND_PORT);
}

bootstrap();
