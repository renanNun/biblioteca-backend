import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import { CreateBookController } from '../controllers/CreateBookController';
import { ListAllBooksController } from '../controllers/ListAllBooksController';

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

booksRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      offset: Joi.number().min(1),
      limit: Joi.number().min(1),
      publisher: Joi.string(),
    },
  }),
  new ListAllBooksController().handle
);

export default booksRouter;
