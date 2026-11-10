import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { NotFoundException } from '../exceptions/not-found.exception';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { ConflictException } from '../exceptions/conflict.exception';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export interface IErrorResponse {
  success: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
  method?: string;
}

export const errorMiddleware: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = getStatusCode(err);
  const message = getMessage(err);
  const response = buildErrorResponse(statusCode, message, req);

  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, {
    stack: err.stack,
    statusCode
  });

  res.status(statusCode).json(response);
};

function getStatusCode(err: Error | AppError): number {
  if (err instanceof NotFoundException) {
    return 404;
  }
  if (err instanceof BadRequestException) {
    return 400;
  }
  if (err instanceof ConflictException) {
    return 409;
  }
  if (err instanceof AppError) {
    return err.statusCode;
  }
  return 500;
}

function getMessage(err: Error | AppError): string {
  if (err instanceof AppError) {
    return err.message;
  }
  if (err.message) {
    return err.message;
  }
  return 'Error interno del servidor';
}

function buildErrorResponse(
  statusCode: number,
  message: string,
  req: Request
): IErrorResponse {
  const response: IErrorResponse = {
    success: false,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  };

  if (statusCode >= 500) {
    response.message = 'Error interno del servidor';
  }

  return response;
}

export const asyncHandler = <T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: 'Recurso no encontrado',
    statusCode: 404,
    timestamp: new Date().toISOString()
  });
};