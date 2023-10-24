import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserDTO } from '../dto/user.dto';
import { hash } from 'bcrypt';

@Injectable() // Informar para o nest gerenciar essa classe - Algo vai chamar isso
export class CreateUserUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: CreateUserDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });

    if (user) {
      throw new HttpException('User Already exists!', HttpStatus.BAD_REQUEST);
    }

    const password_hash = await hash(data.password, 10);

    return await this.prisma.user.create({
      data: {
        ...data,
        password: password_hash,
      },
    });
  }
}
