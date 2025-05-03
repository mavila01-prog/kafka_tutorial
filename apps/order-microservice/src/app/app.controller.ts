import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateOrderDto, KafkaTopics, OrderResponseDto } from '@kafka-tutorial/shared';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern(KafkaTopics.ORDER_CREATED)
  async processOrder(@Payload() orderData: CreateOrderDto): Promise<OrderResponseDto> {
    this.logger.log(`Order received: ${JSON.stringify(orderData)}`);
    
    // Process the order
    const result = this.appService.processOrder(orderData);
    
    // After processing, notify interested services about order completion
    // This is optional and can be done alongside returning the response
    console.log("[Order Received]: ", orderData);
    
    this.logger.log(`Order processed: ${orderData.productId}`);
    
    // With MessagePattern, this result is sent back to the requesting service
    return result;
  }

  @EventPattern(KafkaTopics.ORDER_CREATED)
  async processOrderEvent(@Payload() orderData: CreateOrderDto): Promise<OrderResponseDto> {
    this.logger.log(`Order received: ${JSON.stringify(orderData)}`);
    
    // Process the order
    const result = this.appService.processOrder(orderData);
    return result;
  }
}
