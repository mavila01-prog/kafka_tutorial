import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsString()
  @IsNotEmpty()
  customerId!: string;

  @IsNumber()
  @IsNotEmpty()
  quantity!: number;
} 