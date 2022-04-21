import { inject, injectable } from 'tsyringe';
import { IUpdateBook } from '../../../domain/models/books/IUpdateBook';
import { IAuthorsRepository } from '../../../domain/repositories/IAuthorsRepository';
import { IBooksRepository } from '../../../domain/repositories/IBooksRepository';
import AppError from '../../../shared/errors/AppError';
import { Book } from '../models/Book';

@injectable()
export class UpdateBookService {
  constructor(
    @inject('BooksRepository')
    private readonly booksRepository: IBooksRepository,

    @inject('AuthorsRepository')
    private readonly authorsRepository: IAuthorsRepository
  ) {}

  public async execute(id: string, data: IUpdateBook): Promise<Book> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Book not found', 404);
    }

    if (data.title) {
      if (book.title === data.title) {
        throw new AppError('Book title cannot be the same', 400);
      }

      if (
        await this.booksRepository.findByTitleAndAuthor(
          data.title,
          book.author_id
        )
      ) {
        throw new AppError('Book title already exists', 400);
      }

      book.title = data.title;
    }

    if (data.author) {
      const author = await this.authorsRepository.findByName(data.author);

      if (!author) {
        throw new AppError('Author not found', 404);
      }

      if (book.author_id === author.id) {
        throw new AppError('Book author cannot be the same', 400);
      }

      if (
        await this.booksRepository.findByTitleAndAuthor(book.title, author.id)
      ) {
        throw new AppError('Book title already exists', 400);
      }

      book.author_id = author.id;
    }

    if (data.publisher) book.publisher = data.publisher;
    if (data.photo) book.photo = data.photo;

    return book;
  }
}
