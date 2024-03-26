import bcrypt from 'bcrypt';

const saltRounds = 10;

export class UserService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  static async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
