import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  getKafkaBrokers(): string[] {
    return [
      this.configService.get<string>('KAFKA_BROKER_1'),
      this.configService.get<string>('KAFKA_BROKER_2'),
      this.configService.get<string>('KAFKA_BROKER_3'),
    ].filter(Boolean);
  }

  getServicePort(serviceName: string): number {
    return this.configService.get<number>(`${serviceName.toUpperCase()}_PORT`, 3000);
  }

  getServiceName(serviceName: string): string {
    return this.configService.get<string>(`${serviceName.toUpperCase()}_SERVICE_NAME`, serviceName);
  }

  getConsumerGroup(serviceName: string): string {
    return this.configService.get<string>(`${serviceName.toUpperCase()}_CONSUMER_GROUP`, `${serviceName}-consumer`);
  }
} 