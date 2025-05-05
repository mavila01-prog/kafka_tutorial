import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@kafka-tutorial/config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  // Create Fastify HTTP adapter
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  const configService = app.get(ConfigService);
  const serviceName = 'api-gateway';

  // Set global prefix for HTTP routes
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('API Gateway for the Kafka tutorial')
    .setVersion('1.0')
    .addTag('api-gateway')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  const port = configService.getServicePort(serviceName);
  await app.listen(port, '0.0.0.0');

  Logger.log(`🚀 ${configService.getServiceName(serviceName)} is running on port ${port}`);
  Logger.log(`🌐 HTTP server is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`📚 Swagger docs available at: http://localhost:${port}/${globalPrefix}/docs`);
}

bootstrap();