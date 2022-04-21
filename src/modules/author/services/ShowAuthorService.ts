import { inject, injectable } from 'tsyringe';
import { IAuthorsRepository } from '../../../domain/repositories/IAuthorsRepository';
import AppError from '../../../shared/errors/AppError';
import { Author } from '../models/Author';

@injectable()
export class ShowAuthorService {
  constructor(
    @inject('AuthorRepository')
    private authorRepository: IAuthorsRepository
  ) {}

  public async execute(id: string): Promise<Author | undefined> {
    const author = await this.authorRepository.findById(id);

    if (!author) {
      throw new AppError('Author not found', 404);
    }

    return author;
  }
}
