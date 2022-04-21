import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import { CreateAuthorController } from '../controllers/CreateAuthorController';
import { DeleteAuthorController } from '../controllers/DeleteAuthorController';
import { ListAllAuthorsController } from '../controllers/ListAllAuthorsController';
import { ShowAuthorController } from '../controllers/ShowAuthorController';
import { UpdateAuthorController } from '../controllers/UpdateAuthorController';

const authorRoutes = Router();

authorRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  new CreateAuthorController().handle
);

authorRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      offset: Joi.number(),
      limit: Joi.number(),
    },
  }),
  new ListAllAuthorsController().handle
);

authorRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  new ShowAuthorController().handle
);

authorRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  new UpdateAuthorController().handle
);

authorRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  new DeleteAuthorController().handle
);

export default authorRoutes;
