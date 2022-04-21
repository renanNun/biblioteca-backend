import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateBookService } from '../services/UpdateBookService';

export class UpdateBookController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { title, author, photo, publisher } = request.body;

    const updateBookService = container.resolve(UpdateBookService);

    const book = await updateBookService.execute(id, {
      title,
      author,
      photo,
      publisher,
    });

    return response.status(200).json({
      message: 'Book updated successfully',
      data: book,
    });
  }
}
