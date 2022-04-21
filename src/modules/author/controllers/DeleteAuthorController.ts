import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteAuthorService } from '../services/DeleteAuthorService';

export class DeleteAuthorController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAuthorService = container.resolve(DeleteAuthorService);

    await deleteAuthorService.execute(id);

    return response.status(204).json({
      message: 'Author deleted successfully',
    });
  }
}
