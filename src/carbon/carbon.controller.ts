import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarbonService } from './carbon.service';

@Controller('carbon')
export class CarbonController {
  constructor(private readonly carbonService: CarbonService) {}

  @Get()
  findAll() {
    return this.carbonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carbonService.findOne(+id);
  }

}
