import { getRepository, Repository } from 'typeorm';
import { ICreateAuthor } from '../../../domain/models/authors/ICreateAuthor';
import { IUpdateAuthor } from '../../../domain/models/authors/IUpdateAuthor';
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

  public async findById(id: string): Promise<Author | undefined> {
    const author = await this.authorsRepository.findOne({
      where: { id: id },
    });

    return author;
  }

  public async delete(id: string): Promise<void> {
    await this.authorsRepository.delete(id);
  }

  public async update(
    id: string,
    data: IUpdateAuthor
  ): Promise<Author | undefined> {
    const author = await this.authorsRepository.findOneOrFail(id);

    author.name = data.name;

    return author;
  }

  public async findAll(
    offset: number,
    limit: number
  ): Promise<Author[] | undefined> {
    const authors = await this.authorsRepository.find({
      skip: offset,
      take: limit,
    });

    return authors;
  }
}
