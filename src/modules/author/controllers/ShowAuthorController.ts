import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ShowAuthorService } from '../services/ShowAuthorService';

export class ShowAuthorController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAuthorService = container.resolve(ShowAuthorService);

    const author = await showAuthorService.execute(id);

    return response.status(200).json({
      message: 'Author found successfully',
      data: author,
    });
  }
}
