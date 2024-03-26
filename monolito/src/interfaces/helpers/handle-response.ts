import { Response } from 'express';
import { HttpResponse } from '@interfaces/protocols';

export const handleResponse = async (res: Response, result: HttpResponse) => {
  res.status(result.statusCode).json(result.body);
};
