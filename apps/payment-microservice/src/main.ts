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
        // clientId: 'api-gateway',
        brokers: ['192.168.18.91:9092', '192.168.18.91:9094', '192.168.18.91:9096'],
      },
      consumer: {
        groupId: 'payment-gateway-consumer',
      },
      producer: {
        createPartitioner: Partitioners.DefaultPartitioner,
      }
    },
  });

  const port = process.env.PORT || 3002;

  await app.listen();
  
  Logger.log(`🚀 Payment microservice is listening on kafka1:9092 and port ${port}`);
}

bootstrap();
