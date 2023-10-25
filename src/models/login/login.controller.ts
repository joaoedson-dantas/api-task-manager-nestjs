import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { SingInUseCase } from './useCases/sign-in.usecase';

@Controller()
export class LoginController {
  constructor(private signInUseCase: SingInUseCase) {}

  @Post('/signIn')
  async signIn(@Body() signInDTO: SignInDTO) {
    const token = await this.signInUseCase.execute(signInDTO);
    return token;
  }
}
