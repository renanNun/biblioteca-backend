import { Book } from '../../modules/books/models/Book';
import { ICreateBook } from '../models/books/ICreateBook';
import { IListBooks } from '../models/books/IListBooks';

export interface IBooksRepository {
  findByTitleAndAuthor(
    title: string,
    author_id: string
  ): Promise<Book | undefined>;
  create(data: ICreateBook): Promise<Book>;
  save(book: Book): Promise<void>;
  findAll(
    limit: number,
    offset: number,
    order: string,
    author?: string
  ): Promise<Book[] | undefined>;
  findById(id: string): Promise<Book>;
  delete(id: string): Promise<void>;
}
