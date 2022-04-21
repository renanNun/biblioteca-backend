import { inject, injectable } from 'tsyringe';
import { ICreateBook } from '../../../domain/models/books/ICreateBook';
import { IAuthorsRepository } from '../../../domain/repositories/IAuthorsRepository';
import { IBooksRepository } from '../../../domain/repositories/IBooksRepository';
import RedisCache from '../../../shared/cache/RedisCache';
import AppError from '../../../shared/errors/AppError';
import { Book } from '../models/Book';

@injectable()
export class CreateBookService {
  constructor(
    @inject('BooksRepository')
    private readonly booksRepository: IBooksRepository,

    @inject('AuthorsRepository')
    private readonly authorsRepository: IAuthorsRepository
  ) {}

  public async execute(data: ICreateBook): Promise<Book> {
    const existingAuthor = await this.authorsRepository.findByName(data.author);
    console.log(existingAuthor);
    if (!existingAuthor) {
      throw new AppError('Author not found', 400);
    }

    const existingBook = await this.booksRepository.findByTitleAndAuthor(
      data.title,
      existingAuthor.id
    );

    if (existingBook) {
      throw new AppError(
        'An Book with this title and author already exists',
        400
      );
    }

    const book = await this.booksRepository.create({
      title: data.title,
      author: existingAuthor.id,
      publisher: data.publisher,
      photo: data.photo,
    });

    await this.booksRepository.save(book);

    await RedisCache.invalidatePrefix('books');

    return book;
  }
}
