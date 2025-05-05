import { IsString, IsNumber, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class OrderWithNullableDto {
  @ApiProperty({
    description: 'The ID of the product',
    example: faker.string.uuid(),
  })
  @IsString()
  @IsNotEmpty()
  productId!: string; // Required
  
  @ApiProperty({
    description: 'The ID of the customer',
    example: faker.string.uuid(),
  })
  @IsString()
  @IsNotEmpty()
  customerId!: string; // Required
  
  @ApiProperty({
    description: 'The quantity of the product',
    example: faker.number.int({ min: 1, max: 100 }),
  })
  @IsNumber()
  @IsNotEmpty()
  quantity!: number; // Required
  
  @ApiPropertyOptional({
    description: 'Optional notes for the order',
    example: faker.lorem.sentence(),
  })
  @IsString()
  @IsOptional()
  notes?: string; // Optional (undefined if not provided)
  
  @ApiPropertyOptional({
    description: 'Referral code for the order, can be null',
    example: faker.word.words(2),
    nullable: true,
  })
  @IsString()
  @ValidateIf((o) => o.referralCode !== null)
  @IsOptional()
  referralCode: string | null = null; // Can be explicitly null
}