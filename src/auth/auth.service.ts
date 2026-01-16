import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  loginUser(loginDto: LoginDto) {
    return { message: 'User authenticated successfully', user: loginDto };
  }
}
