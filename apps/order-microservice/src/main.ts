/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'api-gateway',
        brokers: ['kafka1:9092'],
      },
      consumer: {
        groupId: 'api-gateway-consumer',
      }
    },
  });

  await app.listen();
  Logger.log('🚀 Kafka consumer is listening on kafka1:9092');
}

bootstrap();
