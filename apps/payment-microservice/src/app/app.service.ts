import { KafkaTopics, OrderResponseDto } from '@kafka-tutorial/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  proccessOrder(orderData: OrderResponseDto): OrderResponseDto {
    console.log("[Payment Service]: Payment in process:", {
      message: orderData.message,
      // productId: orderData.data.productId,
      status: orderData.status,
      timestamp: orderData.timestamp
    });
    return {
      message: orderData.message,
      data: orderData.data,
      status: "completed",
      timestamp: orderData.timestamp
    };
  }
}
