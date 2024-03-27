import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@domains/services/AuthService';
import { handleResponse, unauthorized } from '@interfaces/helpers';

interface RequestWithUser extends Request {
  userId: string;
}

export function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    handleResponse(res, unauthorized());
    return;
  }

  const decoded = AuthService.verifyToken(token);

  if (!decoded) {
    handleResponse(res, unauthorized());
    return;
  }

  req.userId = decoded.userId;

  next();
}
