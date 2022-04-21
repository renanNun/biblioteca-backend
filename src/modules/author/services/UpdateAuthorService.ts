import { inject, injectable } from 'tsyringe';
import { IUpdateAuthor } from '../../../domain/models/authors/IUpdateAuthor';
import { IAuthorsRepository } from '../../../domain/repositories/IAuthorsRepository';
import RedisCache from '../../../shared/cache/RedisCache';
import AppError from '../../../shared/errors/AppError';
import { Author } from '../models/Author';

@injectable()
export class UpdateAuthorService {
  constructor(
    @inject('AuthorRepository')
    private authorRepository: IAuthorsRepository
  ) {}

  public async execute(id: string, data: IUpdateAuthor): Promise<Author> {
    const author = await this.authorRepository.findById(id);

    if (!author) {
      throw new AppError('Author not found', 404);
    }

    if (author.name === data.name) {
      throw new AppError('Author name cannot be the same', 400);
    }

    if (await this.authorRepository.findByName(data.name)) {
      throw new AppError('Author name already in use', 400);
    }

    await this.authorRepository.update(id, author);

    await RedisCache.invalidatePrefix('author');

    return author;
  }
}
