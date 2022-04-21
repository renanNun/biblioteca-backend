import { inject, injectable } from 'tsyringe';
import { IBooksRepository } from '../../../domain/repositories/IBooksRepository';
import AppError from '../../../shared/errors/AppError';
import { Book } from '../models/Book';

@injectable()
export class ShowBookService {
  constructor(
    @inject('BooksRepository')
    private readonly booksRepository: IBooksRepository
  ) {}

  public async execute(id: string): Promise<Book> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Book not found', 404);
    }

    return book;
  }
}
