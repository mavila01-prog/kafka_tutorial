import { CreateOrderDto } from './create-order.dto';

export class OrderResponseDto {
  message!: string;
  data!: CreateOrderDto;
  status!: 'processing' | 'completed' | 'failed';
  timestamp!: Date;

  constructor(partial: Partial<OrderResponseDto>) {
    Object.assign(this, partial);
    this.timestamp = new Date();
  }
} 