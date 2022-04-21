import { container } from 'tsyringe';
import { IAuthorsRepository } from '../../domain/repositories/IAuthorsRepository';
import { IBooksRepository } from '../../domain/repositories/IBooksRepository';
import { AuthorsRepositoy } from '../../modules/author/repositories/AuthorsRepository';
import { BooksRepository } from '../../modules/books/repositories/BooksRepository';

container.registerSingleton<IAuthorsRepository>(
  'AuthorsRepository',
  AuthorsRepositoy
);

container.registerSingleton<IBooksRepository>(
  'BooksRepository',
  BooksRepository
);
