import { Router } from 'express';
import booksRouter from '../../../modules/books/routes/books.routes';

const routes = Router();

routes.use('/books', booksRouter);

export default routes;
