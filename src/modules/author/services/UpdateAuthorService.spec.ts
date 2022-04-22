import AppError from '../../../shared/errors/AppError';
import { FakeAuthorsRepository } from '../repositories/fakes/FakeAuthorsRepository';
import { UpdateAuthorService } from './UpdateAuthorService';

describe('UpdateAuthorService', () => {
  let service: UpdateAuthorService;
  let mockAuthorRepository: FakeAuthorsRepository;

  beforeAll(() => {
    mockAuthorRepository = new FakeAuthorsRepository();
    service = new UpdateAuthorService(mockAuthorRepository);
  });

  it('should be able to update an author', async () => {
    const author = await mockAuthorRepository.create({
      name: 'John Doe',
    });

    await mockAuthorRepository.save(author);

    const updatedAuthor = await service.execute(author.id, {
      name: 'John Doe Jr.',
    });

    expect(updatedAuthor.name).toBe('John Doe');
  });

  it('should not be able update an author with same name', async () => {
    const author = await mockAuthorRepository.create({
      name: 'Anne Doe',
    });

    await mockAuthorRepository.save(author);

    await expect(
      service.execute(author.id, {
        name: 'Anne Doe',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an author with a name in use', async () => {
    const author = await mockAuthorRepository.create({
      name: 'John Doe',
    });

    await mockAuthorRepository.save(author);

    const anotherAuthor = await mockAuthorRepository.create({
      name: 'John Doe Jr.',
    });

    await mockAuthorRepository.save(anotherAuthor);

    await expect(
      service.execute(author.id, {
        name: 'John Doe Jr.',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an author that does not exist', async () => {
    await expect(
      service.execute('invalid-id', {
        name: 'John Doe',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
