import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateBookService } from '../services/CreateBookService';

export class CreateBookController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const createBookService = container.resolve(CreateBookService);

    const book = await createBookService.execute({ title });

    return response.status(201).json({
      message: 'Book created',
      data: book,
    });
  }
}
