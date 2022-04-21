import { inject, injectable } from 'tsyringe';
import { IListBooks } from '../../../domain/models/IListBooks';
import { IBooksRepository } from '../../../domain/repositories/IBooksRepository';
import RedisCache from '../../../shared/cache/RedisCache';
import { Book } from '../models/Book';

@injectable()
export class ListAllBooksService {
  constructor(
    @inject('BooksRepository')
    private readonly booksRepository: IBooksRepository
  ) {}

  public async execute(data: IListBooks): Promise<Book[]> {
    const cacheKey = `books:${data.offset}:${data.limit}:${data.order}`;

    const cachedBooks = await RedisCache.get<Book[]>(cacheKey);

    if (cachedBooks) {
      return cachedBooks;
    }

    const books = await this.booksRepository.findAll(
      data.limit,
      data.offset,
      data.order
    );

    await RedisCache.set(cacheKey, books);

    return books;
  }
}
