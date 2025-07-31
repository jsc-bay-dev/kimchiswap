import rateLimit from 'express-rate-limit'; // middleware to limit the number of requests from an IP address
import { logger } from '../utils/logger'; // logger to log the rate limit exceeded

// rate limiter to limit the number of requests from an IP address  
export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'), // 15 minutes
  max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'), // Limit each IP to 100 requests per windowMs
  message: {
    success: false, 
    error: {
      message: 'Too many requests from this IP, please try again later.'
    }
  },
  standardHeaders: true, // standard headers to log the rate limit exceeded
  legacyHeaders: false, // legacy headers to log the rate limit exceeded
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`); // log the rate limit exceeded
    res.status(429).json({
      success: false, // return false
      error: {
        message: 'Too many requests from this IP, please try again later.' // return the error message  
      }
    });
  }
});