import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';

async function bootstrap() {
  // express
  // const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 8080);

  // fastify
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      ejs: require('ejs'),
    },
    templates: join(__dirname, '..', 'views'),
  });

  await app.listen(process.env.PORT ?? 80, '0.0.0.0');

  console.log(`app is running on ${await app.getUrl()}`);
}

bootstrap();
