import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@kafka-tutorial/config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  // Create Fastify HTTP adapter
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  const configService = app.get(ConfigService);
  const serviceName = 'api-gateway';

  // Set global prefix for HTTP routes
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  
  const port = configService.getServicePort(serviceName);
  await app.listen(port, '0.0.0.0');
  
  Logger.log(`🚀 ${configService.getServiceName(serviceName)} is running on port ${port}`);
  Logger.log(`🌐 HTTP server is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();