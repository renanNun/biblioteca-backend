import { inject, injectable } from 'tsyringe';
import { IBooksRepository } from '../../../domain/repositories/IBooksRepository';
import RedisCache from '../../../shared/cache/RedisCache';
import AppError from '../../../shared/errors/AppError';

@injectable()
export class DeleteBookService {
  constructor(
    @inject('BooksRepository')
    private readonly booksRepository: IBooksRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const exists = await this.booksRepository.findById(id);

    if (!exists) {
      throw new AppError('Book not found', 404);
    }

    await this.booksRepository.delete(id);

    await RedisCache.invalidateAll();

    return;
  }
}
