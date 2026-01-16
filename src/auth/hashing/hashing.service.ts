export abstract class HashingServiceProtocol {
  abstract makeHash(password: string): Promise<string>;
  abstract compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
