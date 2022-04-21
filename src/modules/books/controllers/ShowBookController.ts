import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ShowBookService } from '../services/ShowBookService';

export class ShowBookController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    console.log(`Showing book: ${id}`);

    const showBookService = container.resolve(ShowBookService);

    const book = await showBookService.execute(id);

    return response.status(200).json({
      message: 'Book found successfully',
      data: book,
    });
  }
}
