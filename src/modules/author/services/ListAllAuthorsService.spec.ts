import { FakeAuthorsRepository } from '../repositories/fakes/FakeAuthorsRepository';
import { ListAllAuthorService } from './ListAllAuthorsService';

describe('ListAllAuthorsService', () => {
  let service: ListAllAuthorService;
  let mockAuthorRepository: FakeAuthorsRepository;

  beforeAll(() => {
    mockAuthorRepository = new FakeAuthorsRepository();
    service = new ListAllAuthorService(mockAuthorRepository);
  });

  it('should be able to list all authors', async () => {
    const author = await mockAuthorRepository.create({
      name: 'John Doe',
    });

    await mockAuthorRepository.save(author);

    const authors = await service.execute({
      offset: 0,
      limit: 10,
    });

    expect(authors).toHaveLength(1);
  });

  it('should be able to list all authors with offset', async () => {
    const author = await mockAuthorRepository.create({
      name: 'John Doe',
    });

    await mockAuthorRepository.save(author);

    const authors = await service.execute({
      offset: 1,
      limit: 10,
    });

    expect(authors).toHaveLength(0);
  });

  it('should be able to list all authors with limit', async () => {
    const author = await mockAuthorRepository.create({
      name: 'John Doe',
    });

    await mockAuthorRepository.save(author);

    const authorSecundary = await mockAuthorRepository.create({
      name: 'John Doe Jr.',
    });

    await mockAuthorRepository.save(authorSecundary);

    const authors = await service.execute({
      offset: 0,
      limit: 1,
    });

    expect(authors).toHaveLength(1);
  });
});
