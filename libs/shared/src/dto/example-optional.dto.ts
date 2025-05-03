import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ExampleOptionalDto {
  @IsString()
  requiredField!: string; // Always required
  
  @IsString()
  @IsOptional() // Validator will allow this to be missing
  optionalField?: string; // ? makes it optional at the type level
  
  @IsNumber()
  @IsOptional()
  nullableQuantity?: number; // Can be undefined
} 