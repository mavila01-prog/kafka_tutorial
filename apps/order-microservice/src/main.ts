/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'api-gateway',
        brokers: ['192.168.0.106:9092', '192.168.0.106:9094', '192.168.0.106:9096'],
      },
      consumer: {
        groupId: 'api-gateway-consumer',
      },
      producer: {
        createPartitioner: Partitioners.DefaultPartitioner,
      }
    },
  });

  await app.listen();
  Logger.log('🚀 Kafka consumer is listening on kafka1:9092');
}

bootstrap();
