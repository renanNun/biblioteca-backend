import { inject, injectable } from 'tsyringe';
import { IAuthorsRepository } from '../../../domain/repositories/IAuthorsRepository';
import RedisCache from '../../../shared/cache/RedisCache';
import AppError from '../../../shared/errors/AppError';

@injectable()
export class DeleteAuthorService {
  constructor(
    @inject('AuthorRepository')
    private authorRepository: IAuthorsRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const authorExists = await this.authorRepository.findById(id);

    if (!authorExists) {
      throw new AppError('Author not found', 404);
    }

    await this.authorRepository.delete(id);

    await RedisCache.invalidatePrefix('author');
  }
}
