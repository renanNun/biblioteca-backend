import { Router } from 'express';
import authorRoutes from '../../../modules/author/routes/author.routes';
import booksRouter from '../../../modules/books/routes/books.routes';
import RedisCache from '../../cache/RedisCache';

const routes = Router();

routes.use('/books', booksRouter);
routes.use('/books/authors', authorRoutes);

routes.get('/cacheclear', (request, response) => {
  RedisCache.invalidateAll();

  return response.status(200).json({
    status: 'success',
    message: 'Cache invalidated',
  });
});

export default routes;
