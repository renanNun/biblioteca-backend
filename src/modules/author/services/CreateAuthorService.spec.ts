import AppError from '../../../shared/errors/AppError';
import { FakeAuthorsRepository } from '../repositories/fakes/FakeAuthorsRepository';
import { CreateAuthorService } from './CreateAuthorService';
import '../../../shared/container';

describe('CreateAuthorService', () => {
  let service: CreateAuthorService;
  let mockAuthorRepository: FakeAuthorsRepository;

  beforeAll(() => {
    mockAuthorRepository = new FakeAuthorsRepository();
    service = new CreateAuthorService(mockAuthorRepository);
  });

  it('should be able to create a new author', async () => {
    const author = await service.execute({
      name: 'John Doe',
    });

    expect(author).toBeTruthy();
  });

  it('should not be able to create a new author with same name', async () => {
    await expect(
      service.execute({
        name: 'John Doe',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be created a uuid', async () => {
    const author = await service.execute({
      name: 'Annie Doe',
    });

    expect(author.id).toBeTruthy();
  });
});
