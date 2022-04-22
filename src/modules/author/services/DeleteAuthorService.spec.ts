import AppError from '../../../shared/errors/AppError';
import { FakeAuthorsRepository } from '../repositories/fakes/FakeAuthorsRepository';
import { DeleteAuthorService } from './DeleteAuthorService';

describe('DeleteAuthorService', () => {
  let service: DeleteAuthorService;
  let mockAuthorRepository: FakeAuthorsRepository;

  beforeAll(() => {
    mockAuthorRepository = new FakeAuthorsRepository();
    service = new DeleteAuthorService(mockAuthorRepository);
  });

  it('should be able to delete an author', async () => {
    const author = await mockAuthorRepository.create({
      name: 'John Doe',
    });

    await mockAuthorRepository.save(author);

    const deletedAuthor = await service.execute(author.id);

    expect(deletedAuthor).toBeUndefined();
  });

  it('should not be able to delete an author that does not exist', async () => {
    await expect(service.execute('invalid-id')).rejects.toBeInstanceOf(
      AppError
    );
  });
});
