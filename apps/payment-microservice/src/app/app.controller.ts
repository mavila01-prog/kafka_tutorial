import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopics, OrderResponseDto } from '@kafka-tutorial/shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern(KafkaTopics.ORDER_PROCESSED)
  async processOrder(@Payload() orderData: OrderResponseDto) {
    console.log("[Payment Service]: Payment in process:", {
      message: orderData.message,
      // productId: orderData.data.productId,
      status: orderData.status,
      timestamp: orderData.timestamp
    });
    this.kafkaService.emit(KafkaTopics.PAYMENT_SUCCEED, {
      message: orderData.message,
      data: orderData.data,
      status: orderData.status,
      timestamp: orderData.timestamp
    });
    // return this.appService.processOrder(orderData);
  }
}
