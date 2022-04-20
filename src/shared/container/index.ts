import { container } from 'tsyringe';
import { IBooksRepository } from '../../domain/repositories/IBooksRepository';
import { BooksRepository } from '../../modules/books/repositories/BooksRepository';

container.registerSingleton<IBooksRepository>(
  'BooksRepository',
  BooksRepository
);
