import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteBookService } from '../services/DeleteBookService';

export class DeleteBookController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteBookService = container.resolve(DeleteBookService);

    await deleteBookService.execute(id);

    return response.status(204).json({
      message: 'Book deleted successfully',
    });
  }
}
