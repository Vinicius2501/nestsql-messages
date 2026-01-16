import { Module, Global } from '@nestjs/common';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    BcryptService,
    {
      provide: 'HASHING_SERVICE',
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: ['HASHING_SERVICE', BcryptService],
})
export class AuthModule {}
