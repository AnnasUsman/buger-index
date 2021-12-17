import { Controller, Get, Query } from '@nestjs/common';
import { MapsService } from './maps.service';
import { Observable } from "rxjs";
import { AxiosResponse } from 'axios';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapService: MapsService) {}
}