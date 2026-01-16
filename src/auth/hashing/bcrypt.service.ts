import bcrypt from 'node_modules/bcryptjs';
import { HashingServiceProtocol } from './hashing.service';

export class BcryptService extends HashingServiceProtocol {
  async makeHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  async compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
