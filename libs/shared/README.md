# Shared Module

This module contains shared code, DTOs, interfaces, and constants used across microservices in the Kafka tutorial project.

## Features

- Shared DTOs with validation
- Common interfaces
- Kafka topic constants
- NestJS Global module for easy importing

## Usage

### Installation

The shared module is already included in the workspace. To build it:

```bash
npm run build:shared
```

### Importing

Import the SharedModule in your NestJS modules:

```typescript
import { Module } from '@nestjs/common';
import { SharedModule } from '@kafka-tutorial/shared';

@Module({
  imports: [SharedModule],
  // ...
})
export class AppModule {}
```

### Using Shared DTOs

Import DTOs and other shared code:

```typescript
import { 
  CreateOrderDto, 
  OrderResponseDto, 
  KafkaTopics 
} from '@kafka-tutorial/shared';

@Controller()
export class OrderController {
  @Post()
  createOrder(@Body() orderDto: CreateOrderDto): OrderResponseDto {
    // ...
  }
}
```

## Structure

- `dto/` - Data Transfer Objects
- `interfaces/` - TypeScript interfaces
- `constants/` - Constants like Kafka topics 