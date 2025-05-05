import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from '@kafka-tutorial/shared';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { ConfigModule, ConfigService } from '@kafka-tutorial/config';

@Module({
  imports: [
    SharedModule,
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.getServiceName('api-gateway'),
              brokers: configService.getKafkaBrokers(),
            },
            consumer: {
              groupId: configService.getConsumerGroup('api-gateway'),
            },
            producer: {
              createPartitioner: Partitioners.DefaultPartitioner,
            }
          }
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
