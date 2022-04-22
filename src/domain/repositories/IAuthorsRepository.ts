import { Author } from '../../modules/author/models/Author';
import { ICreateAuthor } from '../models/authors/ICreateAuthor';
import { IUpdateAuthor } from '../models/authors/IUpdateAuthor';

export interface IAuthorsRepository {
  findByName(name: string): Promise<Author | undefined>;
  findById(id: string): Promise<Author | undefined>;
  findAll(offset: number, limit: number): Promise<Author[] | undefined>;
  create(data: ICreateAuthor): Promise<Author>;
  save(author: Author): Promise<void>;
  update(id: string, data: IUpdateAuthor): Promise<Author | undefined>;
  delete(id: string): Promise<void>;
}
