import { Module } from '@nestjs/common';
import { MediaAdictionService } from './mediaAdiction.service';
import { MediaAdictionController } from './mediaAdiction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaAdiction } from './entities/mediaAdiction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaAdiction])],
  controllers: [MediaAdictionController],
  providers: [MediaAdictionService],
})
export class MediaAdictionModule {}
