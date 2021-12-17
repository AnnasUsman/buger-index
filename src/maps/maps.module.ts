import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';

@Module({
    imports: [ConfigModule.forRoot(), HttpModule],
    controllers: [MapsController],
    providers: [MapsService],
  })
  export class MapsModule {}