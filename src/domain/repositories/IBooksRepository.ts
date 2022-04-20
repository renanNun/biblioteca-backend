import { Book } from '../../modules/books/models/Book';

export interface IBooksRepository {
  findByTitle(title: string): Promise<Book>;
  create(): Promise<Book>;
  save(book: Book): Promise<void>;
}
