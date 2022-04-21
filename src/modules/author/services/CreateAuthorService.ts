import { inject, injectable } from 'tsyringe';
import { ICreateAuthor } from '../../../domain/models/authors/ICreateAuthor';
import { IAuthorsRepository } from '../../../domain/repositories/IAuthorsRepository';
import RedisCache from '../../../shared/cache/RedisCache';
import AppError from '../../../shared/errors/AppError';

@injectable()
export class CreateAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private readonly authorsRepository: IAuthorsRepository
  ) {}

  public async execute(data: ICreateAuthor): Promise<any> {
    const existingAuthor = await this.authorsRepository.findByName(data.name);

    if (existingAuthor) {
      throw new AppError('Author already exists', 400);
    }

    const author = await this.authorsRepository.create(data);

    await this.authorsRepository.save(author);

    await RedisCache.invalidatePrefix('authors');

    return author;
  }
}
