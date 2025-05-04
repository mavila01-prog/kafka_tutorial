import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto, KafkaTopics } from '@kafka-tutorial/shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern(KafkaTopics.ORDER_CREATED)
  sendOrderCreatedNotification(@Payload() data: CreateOrderDto) {
    console.log("[Notification Service]: Sending Order Email Notification:", data);
  }

  @MessagePattern(KafkaTopics.PAYMENT_SUCCEED)
  sendPaymentSucceedNotification(@Payload() data: CreateOrderDto) {
    console.log("[Notification Service]: Sending Payment Succeed Email Notification:", data);
  }
}
