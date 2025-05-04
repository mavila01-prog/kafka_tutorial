import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedModule } from '@kafka-tutorial/shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    SharedModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
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
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}