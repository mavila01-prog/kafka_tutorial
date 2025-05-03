import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto, OrderResponseDto } from '@kafka-tutorial/shared';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getData(): { message: string } {
    return { message: 'Order microservice is running' };
  }

  processOrder(orderData: CreateOrderDto): OrderResponseDto {
    this.logger.log(`Processing order for product: ${orderData.productId}`);
    
    // Simulate order processing
    // In a real app, you would:
    // 1. Save to database
    // 2. Call other services
    // 3. Update inventory, etc.
    
    // For now, we'll just return a successful response
    return new OrderResponseDto({
      message: `Order for product ${orderData.productId} processed successfully`,
      data: orderData,
      status: 'completed'
    });
  }
}
