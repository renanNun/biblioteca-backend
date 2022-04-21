import { inject, injectable } from 'tsyringe';
import { IListBooks } from '../../../domain/models/IListBooks';
import { IBooksRepository } from '../../../domain/repositories/IBooksRepository';
import { Book } from '../models/Book';

@injectable()
export class ListAllBooksService {
  constructor(
    @inject('BooksRepository')
    private readonly booksRepository: IBooksRepository
  ) {}

  public async execute(data: IListBooks): Promise<Book[]> {
    const books = await this.booksRepository.findAll(data);

    return books;
  }
}
