import { Author } from '../../modules/author/models/Author';
import { ICreateAuthor } from '../models/authors/ICreateAuthor';

export interface IAuthorsRepository {
  findByName(name: string): Promise<Author | undefined>;
  create(data: ICreateAuthor): Promise<Author>;
  save(author: Author): Promise<void>;
}
