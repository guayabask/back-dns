import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaAdiction } from './entities/mediaAdiction.entity';
import { CreateMediaAdictionDto } from './dto/create-mediaAdiction.dto';
import { UpdateMediaAdictionDto } from './dto/update-mediaAdiction.dto';

@Injectable()
export class MediaAdictionService {
  constructor(
    @InjectRepository(MediaAdiction)
    private readonly mediaAdictionRepository: Repository<MediaAdiction>,
  ) {}

  create(createMediaAdictionDto: CreateMediaAdictionDto): Promise<MediaAdiction> {
    const MediaAdiction = this.mediaAdictionRepository.create(createMediaAdictionDto);
    return this.mediaAdictionRepository.save(MediaAdiction);
  }

  findAll(): Promise<MediaAdiction[]> {
    return this.mediaAdictionRepository.find();
  }

  findOne(Student_ID: number): Promise<MediaAdiction | null> {
    return this.mediaAdictionRepository.findOneBy({ Student_ID });
  }

  async update(Student_ID: number, updateMediaAdictionDto: UpdateMediaAdictionDto): Promise<MediaAdiction | null> {
    await this.mediaAdictionRepository.update(Student_ID, updateMediaAdictionDto);
    return this.findOne(Student_ID);
  }

  async remove(Student_ID: number): Promise<MediaAdiction | null> {
    const MediaAdiction = await this.findOne(Student_ID);
    if (!MediaAdiction) return null;
    await this.mediaAdictionRepository.delete(Student_ID);
    return MediaAdiction;
  }
}
