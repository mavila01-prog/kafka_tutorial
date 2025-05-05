import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from '@kafka-tutorial/shared';
import { ConfigModule, ConfigService } from '@kafka-tutorial/config';

@Module({
  imports: [SharedModule,
    ConfigModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
