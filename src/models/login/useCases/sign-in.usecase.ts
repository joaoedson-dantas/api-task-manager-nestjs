import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from '../dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { compare } from 'bcrypt';

@Injectable()
export class SingInUseCase {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async execute(data: SignInDTO) {
    // validar se o username existe no db

    const user = await this.prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    // NÃO existe -> Retornar ERROR
    if (!user) {
      throw new UnauthorizedException();
    }

    // SIM validar senha
    const isEqualPassword = await compare(data.password, user.password);

    if (!isEqualPassword) {
      throw new UnauthorizedException();
    }

    // SIM - Gerar o token
    const payload = {
      sub: user.id,
      username: user.username,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
