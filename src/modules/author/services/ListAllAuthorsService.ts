import { inject, injectable } from 'tsyringe';
import { IListAuthors } from '../../../domain/models/authors/IListAuthors';
import { IAuthorsRepository } from '../../../domain/repositories/IAuthorsRepository';
import RedisCache from '../../../shared/cache/RedisCache';
import AppError from '../../../shared/errors/AppError';
import { Author } from '../models/Author';

@injectable()
export class ListAllAuthorService {
  constructor(
    @inject('AuthorRepository')
    private authorRepository: IAuthorsRepository
  ) {}

  public async execute(data: IListAuthors): Promise<Author[] | undefined> {
    let cacheKey = 'author';

    if (data.offset) {
      cacheKey = `${cacheKey}:offset:${data.offset}`;
    }

    if (data.limit) {
      cacheKey = `${cacheKey}:limit:${data.limit}`;
    }

    const cachedAuthors = await RedisCache.get<Author[]>(cacheKey);

    if (cachedAuthors) {
      return cachedAuthors;
    }

    const author = await this.authorRepository.findAll(data.offset, data.limit);

    await RedisCache.set(cacheKey, author);

    return author;
  }
}
