import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { OrderResponseDto } from '@kafka-tutorial/shared';
import { faker } from '@faker-js/faker';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });

    it('should return an object with a "message" property', () => {
      const data = service.getData();
      expect(data).toHaveProperty('message');
      expect(typeof data.message).toBe('string');
    });
  });

  describe('proccessOrder', () => {
    it('should process the order and return updated status', () => {
      const mockOrderData: OrderResponseDto = {
        message: faker.commerce.productName(),
        data: {
          customerId: faker.string.uuid(),
          productId: faker.string.uuid(),
          quantity: faker.number.int({ min: 1, max: 10 }),
        },
        status: 'processing',
        timestamp: faker.date.recent(),
      };

      const result = service.proccessOrder(mockOrderData);

      expect(result).toEqual({
        message: mockOrderData.message,
        data: mockOrderData.data,
        status: 'completed',
        timestamp: mockOrderData.timestamp,
      });
    });

    it('should log the order processing details', () => {
      const mockOrderData: OrderResponseDto = {
        message: faker.commerce.productName(),
        data: {
          customerId: faker.string.uuid(),
          productId: faker.string.uuid(),
          quantity: faker.number.int({ min: 1, max: 10 }),
        },
        status: 'processing',
        timestamp: faker.date.recent(),
      };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      service.proccessOrder(mockOrderData);

      expect(consoleSpy).toHaveBeenCalledWith('[Payment Service]: Payment in process:', {
        message: mockOrderData.message,
        status: mockOrderData.status,
        timestamp: mockOrderData.timestamp,
      });

      consoleSpy.mockRestore();
    });
  });
});
