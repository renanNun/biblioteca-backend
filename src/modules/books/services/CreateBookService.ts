import { inject, injectable } from 'tsyringe';
import { ICreateBook } from '../../../domain/models/ICreateBook';
import { IBooksRepository } from '../../../domain/repositories/IBooksRepository';
import AppError from '../../../shared/errors/AppError';
import { Book } from '../models/Book';

@injectable()
export class CreateBookService {
  constructor(
    @inject('BooksRepository')
    private readonly booksRepository: IBooksRepository
  ) {}

  public async execute(data: ICreateBook): Promise<Book> {
    const existingBook = await this.booksRepository.findByTitle(data.title);

    if (existingBook) {
      throw new AppError('Book already exists', 400);
    }

    const book = await this.booksRepository.create();

    await this.booksRepository.save(book);

    return book;
  }
}
