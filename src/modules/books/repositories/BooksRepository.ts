import { getRepository, Repository } from 'typeorm';
import { IBooksRepository } from '../../../domain/repositories/IBooksRepository';
import { Book } from '../models/Book';

export class BooksRepository implements IBooksRepository {
  private readonly booksRepository: Repository<Book>;

  constructor() {
    this.booksRepository = getRepository(Book);
  }

  public async findByTitle(title: string): Promise<Book> {
    const book = await this.booksRepository.findOneOrFail({
      where: { title },
    });

    return book;
  }

  public async create(): Promise<Book> {
    const book = this.booksRepository.create();

    return book;
  }

  public async save(book: Book): Promise<void> {
    await this.booksRepository.save(book);
  }
}
