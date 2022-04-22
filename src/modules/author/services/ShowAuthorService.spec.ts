import AppError from '../../../shared/errors/AppError';
import { Author } from '../models/Author';
import { FakeAuthorsRepository } from '../repositories/fakes/FakeAuthorsRepository';
import { ShowAuthorService } from './ShowAuthorService';

describe('ShowAuthorService', () => {
  let service: ShowAuthorService;
  let mockAuthorRepository: FakeAuthorsRepository;

  beforeAll(() => {
    mockAuthorRepository = new FakeAuthorsRepository();
    service = new ShowAuthorService(mockAuthorRepository);
  });

  it('Should be able to verify if an author exists', async () => {
    const createdAuthor = await mockAuthorRepository.create({
      name: 'John Doe',
    });

    await mockAuthorRepository.save(createdAuthor);

    const author = await service.execute(createdAuthor.id);

    expect(author).toBeInstanceOf(Author);
  });

  it('should be return error if article not found', async () => {
    await expect(service.execute('invalid-id')).rejects.toBeInstanceOf(
      AppError
    );
  });
});
