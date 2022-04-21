import { Book } from '../../modules/books/models/Book';
import { ICreateBook } from '../models/ICreateBook';
import { IListBooks } from '../models/IListBooks';

export interface IBooksRepository {
  findByTitle(title: string): Promise<Book | undefined>;
  create(data: ICreateBook): Promise<Book>;
  save(book: Book): Promise<void>;
  findAll(limit: number, offset: number, order: string): Promise<Book[]>;
  findById(id: string): Promise<Book>;
}
