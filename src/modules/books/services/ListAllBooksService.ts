import { inject, injectable } from 'tsyringe';
import { IListBooks } from '../../../domain/models/books/IListBooks';
import { IAuthorsRepository } from '../../../domain/repositories/IAuthorsRepository';
import { IBooksRepository } from '../../../domain/repositories/IBooksRepository';
import RedisCache from '../../../shared/cache/RedisCache';
import AppError from '../../../shared/errors/AppError';
import { Book } from '../models/Book';

@injectable()
export class ListAllBooksService {
  constructor(
    @inject('BooksRepository')
    private readonly booksRepository: IBooksRepository,

    @inject('AuthorsRepository')
    private readonly authorsRepository: IAuthorsRepository
  ) {}

  public async execute(data: IListBooks): Promise<Book[] | undefined> {
    let cacheKey = `books:${data.offset}:${data.limit}`;

    if (data.author) {
      const existingAuthor = await this.authorsRepository.findByName(
        data.author
      );

      if (!existingAuthor) {
        throw new AppError('Author not found', 400);
      }

      cacheKey += `:${existingAuthor.id}`;

      data.author = existingAuthor.id;
    }

    const cachedBooks = await RedisCache.get<Book[]>(cacheKey);

    if (cachedBooks) {
      return cachedBooks;
    }

    const books = await this.booksRepository.findAll(
      data.limit,
      data.offset,
      data.order,
      data.author
    );

    await RedisCache.set(cacheKey, books);

    return books;
  }
}
