import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import { CreateAuthorController } from '../controllers/CreateAuthorController';

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

export default authorRoutes;
