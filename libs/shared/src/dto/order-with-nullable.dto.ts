import { IsString, IsNumber, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class OrderWithNullableDto {
  @IsString()
  @IsNotEmpty()
  productId!: string; // Required
  
  @IsString()
  @IsNotEmpty()
  customerId!: string; // Required
  
  @IsNumber()
  @IsNotEmpty()
  quantity!: number; // Required
  
  @IsString()
  @IsOptional()
  notes?: string; // Optional (undefined if not provided)
  
  @IsString()
  @ValidateIf((o) => o.referralCode !== null)
  @IsOptional()
  referralCode: string | null = null; // Can be explicitly null
} 