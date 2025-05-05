import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class OrderResponseDto {
  @ApiProperty({ description: 'Response message', example: 'Order created successfully' })
  message!: string;

  @ApiProperty({ description: 'Order data', type: CreateOrderDto })
  data!: CreateOrderDto;

  @ApiProperty({ description: 'Order status', enum: ['processing', 'completed', 'failed'], example: 'processing' })
  status!: 'processing' | 'completed' | 'failed';

  @ApiProperty({ description: 'Timestamp of the response', example: new Date().toISOString() })
  timestamp!: Date;

  constructor(partial: Partial<OrderResponseDto>) {
    Object.assign(this, partial);
    this.timestamp = new Date();
  }
}