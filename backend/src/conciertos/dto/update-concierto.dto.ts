import { PartialType } from '@nestjs/mapped-types';
import { CreateConciertoDto } from './create-concierto.dto';

export class UpdateConciertoDto extends PartialType(CreateConciertoDto) {}
