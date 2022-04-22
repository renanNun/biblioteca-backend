import { ICreateAuthor } from '../../../../domain/models/authors/ICreateAuthor';
import { IUpdateAuthor } from '../../../../domain/models/authors/IUpdateAuthor';
import { IAuthorsRepository } from '../../../../domain/repositories/IAuthorsRepository';
import { Author } from '../../models/Author';
import { v4 as uuidv4 } from 'uuid';

export class FakeAuthorsRepository implements IAuthorsRepository {
  private authorsRepository: Author[] = [];

  public async create(data: ICreateAuthor): Promise<Author> {
    const author = new Author();

    author.id = uuidv4();
    author.name = data.name;
    return author;
  }

  public async save(author: Author): Promise<void> {
    this.authorsRepository.push(author);
  }

  public async findByName(name: string): Promise<Author | undefined> {
    const author = this.authorsRepository.find(
      (author) => author.name === name
    );

    return author;
  }

  public async findById(id: string): Promise<Author | undefined> {
    const author = await this.authorsRepository.find(
      (author) => author.id === id
    );

    return author;
  }

  public async delete(id: string): Promise<void> {
    this.authorsRepository = this.authorsRepository.filter(
      (author) => author.id !== id
    );
  }

  public async update(
    id: string,
    data: IUpdateAuthor
  ): Promise<Author | undefined> {
    const author = await this.authorsRepository.find(
      (author) => author.id === id
    );

    if (author) {
      author.name = data.name;
    }

    return author;
  }

  public async findAll(
    offset: number,
    limit: number
  ): Promise<Author[] | undefined> {
    return this.authorsRepository;
  }
}
