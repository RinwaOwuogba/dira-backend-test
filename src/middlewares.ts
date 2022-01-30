import { ErrorRequestHandler } from 'express';
import { Middleware } from 'express-validator/src/base';
import config from './config';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.statusCode = statusCode;

  if (!config.isProduction) {
    return res.json({
      status: 'error',
      error: {
        message: err.message,
        stack: err.stack,
      },
    });
  }

  return res.status(statusCode).send({
    status: 'error',
    error: {
      message: 'Something went wrong',
    },
  });
};

export const notFoundHandler: Middleware = (req, res, next) => {
  res.json({
    error: {
      message: 'Not found',
    },
  });
};
