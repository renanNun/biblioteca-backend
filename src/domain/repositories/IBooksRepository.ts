import { Book } from '../../modules/books/models/Book';
import { ICreateBook } from '../models/ICreateBook';
import { IListBooks } from '../models/IListBooks';

export interface IBooksRepository {
  findByTitle(title: string): Promise<Book>;
  create(data: ICreateBook): Promise<Book>;
  save(book: Book): Promise<void>;
  findAll(data: IListBooks): Promise<Book[]>;
  findById(id: string): Promise<Book>;
}
