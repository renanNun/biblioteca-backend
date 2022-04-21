import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateBookService } from '../services/CreateBookService';

export class CreateBookController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { title, publisher, photo, authors } = request.body;

    console.log(`Creating book: ${title}`);

    const createBookService = container.resolve(CreateBookService);

    console.log(`Before calling service`);

    const book = await createBookService.execute({
      title,
      publisher,
      photo,
      authors,
    });

    console.log(`After calling service`);

    return response.status(201).json({
      message: 'Book created',
      data: book,
    });
  }
}
