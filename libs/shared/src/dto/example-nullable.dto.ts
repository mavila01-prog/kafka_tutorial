import { IsString, IsNumber, IsOptional, ValidateIf } from 'class-validator';

export class ExampleNullableDto {
  @IsString()
  requiredField!: string; // Always required
  
  @IsString()
  @ValidateIf((o) => o.nullableField !== null) // Only validate if not null
  @IsOptional()
  nullableField: string | null = null; // Explicitly can be string or null
  
  @IsNumber()
  @ValidateIf((o) => o.nullableCount !== null)
  @IsOptional()
  nullableCount: number | null = null; // Explicitly nullable with default
} 