/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { ConfigService } from '@kafka-tutorial/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const serviceName = 'notification';

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: configService.getServiceName(serviceName),
        brokers: configService.getKafkaBrokers(),
      },
      consumer: {
        groupId: configService.getConsumerGroup(serviceName),
      },
      producer: {
        createPartitioner: Partitioners.DefaultPartitioner,
      }
    },
  });

  const port = configService.getServicePort(serviceName);
  await app.startAllMicroservices();
  await app.listen(port);
  
  Logger.log(`🚀 ${configService.getServiceName(serviceName)} is running on port ${port}`);
  Logger.log(`📡 Kafka consumer is connected to brokers: ${configService.getKafkaBrokers().join(', ')}`);
}

bootstrap();
