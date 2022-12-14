import { ID_VALIDATION_ERROR } from './ad-validation.constants';
import { Types } from 'mongoose';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type != 'param') {
      return value;
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ID_VALIDATION_ERROR);
    }

    return value;
  }
}
