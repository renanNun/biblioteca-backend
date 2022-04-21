import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import { CreateBookController } from '../controllers/CreateBookController';
import { DeleteBookController } from '../controllers/DeleteBookController';
import { ListAllBooksController } from '../controllers/ListAllBooksController';
import { ShowBookController } from '../controllers/ShowBookController';

const booksRouter = Router();

booksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      publisher: Joi.string().required(),
      photo: Joi.string().required(),
      author: Joi.string().required(),
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
      order: Joi.string().valid('ASC', 'DESC'),
      author: Joi.string(),
    },
  }),
  new ListAllBooksController().handle
);

booksRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  new ShowBookController().handle
);

booksRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  new DeleteBookController().handle
);

export default booksRouter;
