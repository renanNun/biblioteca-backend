import { getRepository, Repository } from 'typeorm';
import { ICreateAuthor } from '../../../domain/models/authors/ICreateAuthor';
import { IAuthorsRepository } from '../../../domain/repositories/IAuthorsRepository';
import { Author } from '../models/Author';

export class AuthorsRepositoy implements IAuthorsRepository {
  private readonly authorsRepository: Repository<Author>;

  constructor() {
    this.authorsRepository = getRepository(Author);
  }

  public async create(data: ICreateAuthor): Promise<Author> {
    const author = await this.authorsRepository.create(data);

    return author;
  }

  public async save(author: Author): Promise<void> {
    await this.authorsRepository.save(author);
  }

  public async findByName(name: string): Promise<Author | undefined> {
    const author = await this.authorsRepository.findOne({
      where: { name: name },
    });

    return author;
  }
}
