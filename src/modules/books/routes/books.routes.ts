import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import { CreateBookController } from '../controllers/CreateBookController';

const booksRouter = Router();

booksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      publisher: Joi.string().required(),
      photo: Joi.string().required(),
      authors: Joi.array().items(Joi.string()).required(),
    },
  }),
  new CreateBookController().handle
);

export default booksRouter;
