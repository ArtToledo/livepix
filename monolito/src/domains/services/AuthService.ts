import jwt from 'jsonwebtoken';

export class AuthService {
  private static readonly secretKey = process.env.SECRET_AUTH;

  static generateToken(userId: string): string {
    return jwt.sign({ userId }, this.secretKey, { expiresIn: '8h' });
  }

  static verifyToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded as { userId: string };
    } catch (error) {
      return null;
    }
  }
}
