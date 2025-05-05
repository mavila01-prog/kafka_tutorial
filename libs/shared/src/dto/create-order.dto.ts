import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the product being ordered',
    default: faker.string.uuid(),
  })
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @ApiProperty({
    description: 'The customer ID for the order',
    default: faker.string.uuid(),
  })
  @IsString()
  @IsNotEmpty()
  customerId!: string;

  @ApiProperty({
    description: 'The quantity of the product being ordered',
    type: Number,
    minimum: 1,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity!: number;
} 