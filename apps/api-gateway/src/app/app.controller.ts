import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderDto, OrderResponseDto, KafkaTopics } from '@kafka-tutorial/shared';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private readonly client: ClientKafka
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('order')
  createOrder(@Body() order: CreateOrderDto): OrderResponseDto {
    try {
      // Try to emit to Kafka
      this.client.emit(KafkaTopics.ORDER_CREATED, order);
      console.log('Successfully emitted event to Kafka');
    } catch (error) {
      // Log the error but don't fail the request
      console.error('Failed to emit to Kafka:', error.message);
    }
    
    return new OrderResponseDto({
      message: "Order created successfully",
      data: order,
      status: "processing"
    });
  }

  @Post('order-test')
  createOrderTest(@Body() order: CreateOrderDto): OrderResponseDto {
    // This endpoint doesn't try to use Kafka at all
    console.log('Processing test order:', order);
    
    return new OrderResponseDto({
      message: "Test order processed successfully (no Kafka)",
      data: order,
      status: "completed"
    });
  }
}
