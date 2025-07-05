import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaAdictionDto } from './create-mediaAdiction.dto';

export class UpdateMediaAdictionDto extends PartialType(CreateMediaAdictionDto) {}
