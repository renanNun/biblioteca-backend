import { getRepository, Repository } from 'typeorm';
import { ICreateBook } from '../../../domain/models/ICreateBook';
import { IListBooks } from '../../../domain/models/IListBooks';
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

  public async create(data: ICreateBook): Promise<Book> {
    const book = this.booksRepository.create(data);

    return book;
  }

  public async save(book: Book): Promise<void> {
    await this.booksRepository.save(book);
  }

  public async findAll(data: IListBooks): Promise<Book[]> {
    const books = await this.booksRepository
      .createQueryBuilder('book')
      .where('book.publisher LIKE :publisher', {
        publisher: `%${data.publisher}%`,
      })
      .take((data.limit || 10) as number)
      .offset(((data.offset || 1) - 1) * (data.limit || 10))
      .getMany();

    return books;
  }
}
