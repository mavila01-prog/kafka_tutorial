import { Global, Module } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';

// Class providers that can be injected
const PROVIDERS = [
  CreateOrderDto,
  OrderResponseDto
];

@Global()
@Module({
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class SharedModule {} 