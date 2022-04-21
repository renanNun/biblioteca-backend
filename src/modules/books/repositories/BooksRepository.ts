import { getRepository, Repository } from 'typeorm';
import { ICreateBook } from '../../../domain/models/books/ICreateBook';
import { IListBooks } from '../../../domain/models/books/IListBooks';
import { IBooksRepository } from '../../../domain/repositories/IBooksRepository';
import { Book } from '../models/Book';

export class BooksRepository implements IBooksRepository {
  private readonly booksRepository: Repository<Book>;

  constructor() {
    this.booksRepository = getRepository(Book);
  }

  public async findByTitleAndAuthor(
    title: string,
    author_id: string
  ): Promise<Book | undefined> {
    const book = await this.booksRepository.findOne({
      where: {
        title: title,
        author_id: author_id,
      },
    });

    return book;
  }

  public async create(data: ICreateBook): Promise<Book> {
    const book = this.booksRepository.create({
      title: data.title,
      author_id: data.author,
      publisher: data.publisher,
      photo: data.photo,
    });

    return book;
  }

  public async save(book: Book): Promise<void> {
    await this.booksRepository.save(book);
  }

  public async findAll(
    limit: number,
    offset: number,
    order: string,
    author?: string
  ): Promise<Book[] | undefined> {
    let books;

    if (author) {
      books = await this.booksRepository
        .createQueryBuilder('book')
        .innerJoinAndSelect('book.author', 'author')
        .where('author.id = :author', { author: author })
        .take(limit)
        .offset((offset - 1) * limit)
        .orderBy('book.createdAt')
        .getMany();
    } else {
      books = await this.booksRepository
        .createQueryBuilder('book')
        .innerJoinAndSelect('book.author', 'author')
        .take(limit)
        .offset((offset - 1) * limit)
        .orderBy('book.createdAt')
        .getMany();
    }

    return books;
  }

  public async findById(id: string): Promise<Book> {
    const book = await this.booksRepository.findOneOrFail(id, {
      relations: ['author'],
    });

    return book;
  }

  public async delete(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
