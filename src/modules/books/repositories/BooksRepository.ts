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

  public async findByTitle(title: string): Promise<Book | undefined> {
    const book = await this.booksRepository.findOne({
      where: { title: title },
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

  public async findAll(
    limit: number,
    offset: number,
    order: string
  ): Promise<Book[]> {
    const books = await this.booksRepository
      .createQueryBuilder('book')
      .take(limit)
      .offset((offset - 1) * limit)
      .orderBy(order)
      .getMany();

    return books;
  }

  public async findById(id: string): Promise<Book> {
    const book = await this.booksRepository.findOneOrFail(id);

    return book;
  }

  public async delete(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
