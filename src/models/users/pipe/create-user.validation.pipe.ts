import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform(
    { name, email, password, username }: CreateUserDTO,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _metadata: ArgumentMetadata,
  ) {
    if (!name || !email || !password || !username) {
      throw new HttpException(
        `[name, email, username, password] is required`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return {
      name,
      email,
      username,
      password,
    };
  }
}
