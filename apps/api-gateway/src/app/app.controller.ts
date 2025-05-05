import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderDto, OrderResponseDto, KafkaTopics } from '@kafka-tutorial/shared';

@ApiTags('Orders') // Group routes under the "Orders" tag in Swagger
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private readonly client: ClientKafka
  ) {}

  @ApiOperation({ summary: 'Get application data' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved data.' })
  @Get()
  getData() {
    return this.appService.getData();
  }

  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created successfully.', type: OrderResponseDto })
  @ApiResponse({ status: 500, description: 'Failed to emit to Kafka.' })
  @Post('order')
  createOrder(@Body() order: CreateOrderDto): OrderResponseDto {
    try {
      this.client.emit(KafkaTopics.ORDER_CREATED, order);
      console.log('Successfully emitted event to Kafka');
    } catch (error) {
      console.error('Failed to emit to Kafka:', error.message);
    }
    
    return new OrderResponseDto({
      message: "Order created successfully",
      data: order,
      status: "processing"
    });
  }

  @ApiOperation({ summary: 'Create a test order (no Kafka)' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Test order processed successfully.', type: OrderResponseDto })
  @Post('order-test')
  createOrderTest(@Body() order: CreateOrderDto): OrderResponseDto {
    console.log('Processing test order:', order);
    
    return new OrderResponseDto({
      message: "Test order processed successfully (no Kafka)",
      data: order,
      status: "completed"
    });
  }
}
