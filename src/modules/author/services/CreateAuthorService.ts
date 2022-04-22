import { inject, injectable } from 'tsyringe';
import { ICreateAuthor } from '../../../domain/models/authors/ICreateAuthor';
import { IAuthorsRepository } from '../../../domain/repositories/IAuthorsRepository';
import RedisCache from '../../../shared/cache/RedisCache';
import AppError from '../../../shared/errors/AppError';
import { Author } from '../models/Author';

@injectable()
export class CreateAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private readonly authorsRepository: IAuthorsRepository
  ) {}

  public async execute(data: ICreateAuthor): Promise<Author> {
    const existingAuthor = await this.authorsRepository.findByName(data.name);

    if (existingAuthor) {
      throw new AppError('Author already exists', 400);
    }

    const author = await this.authorsRepository.create(data);

    await this.authorsRepository.save(author);

    await RedisCache.invalidatePrefix('author');

    return author;
  }
}
