import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { MediaAdictionService } from './mediaAdiction.service';
import { CreateMediaAdictionDto } from './dto/create-mediaAdiction.dto';
import { UpdateMediaAdictionDto } from './dto/update-mediaAdiction.dto';
import { MediaAdiction } from './entities/mediaAdiction.entity';

@Controller('MediaAdictions')
export class MediaAdictionController {
  constructor(private readonly mediaAdictionService: MediaAdictionService) {}

  @Post()
  create(@Body() dto: CreateMediaAdictionDto): Promise<MediaAdiction> {
    return this.mediaAdictionService.create(dto);
  }

  @Get()
  async findAll(): Promise<MediaAdiction[]> {
    return this.mediaAdictionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MediaAdiction | null> {
    return this.mediaAdictionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMediaAdictionDto,
  ): Promise<MediaAdiction | null> {
    return this.mediaAdictionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<MediaAdiction | null> {
    return this.mediaAdictionService.remove(id);
  }
}
