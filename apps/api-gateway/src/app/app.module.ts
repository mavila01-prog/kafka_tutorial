import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedModule } from '@kafka-tutorial/shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
            brokers: ['127.0.0.1:9092', '127.0.0.1:9094', '127.0.0.1:9096'],
            connectionTimeout: 3000,
            ssl: false
          },
          producer: {
            allowAutoTopicCreation: true,
            // Prevent broker discovery
            metadataMaxAge: 300000
          },
          consumer: {
            groupId: 'api-gateway-consumer',
            // Prevent broker discovery
            metadataMaxAge: 300000
          }
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}