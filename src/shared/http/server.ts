import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import AppError from '../errors/AppError';
import '../container';
import './typeorm';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(errors());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
