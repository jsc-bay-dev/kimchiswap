import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error { // interface to define the error
  statusCode?: number; // an additional properties appended to Error type
  isOperational?: boolean; 
}

export const errorHandler = ( // error handler to handle the errors
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error
  logger.error({ 
    error: err.message, 
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // error response
  const errorResponse = {
    success: false,
    error: {
      message: process.env['NODE_ENV'] === 'production' && statusCode === 500 
        ? 'Internal Server Error' 
        : message,
      ...(process.env['NODE_ENV'] !== 'production' && { stack: err.stack })
    }
  };

  res.status(statusCode).json(errorResponse);
};