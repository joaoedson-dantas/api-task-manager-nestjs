import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';
import { hash } from 'bcrypt';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    const user = await this.userRepository.findByUsernameOrEmail({
      username: data.username,
      email: data.email,
    });
    console.log(user);
    if (user) {
      throw new HttpException('User Already exists!', HttpStatus.BAD_REQUEST);
    }

    const password = await hash(data.password, 10);

    return await this.userRepository.save({
      ...data,
      password,
    });
  }
}
