import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateAuthorService } from '../services/UpdateAuthorService';

export class UpdateAuthorController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const updateAuthorService = container.resolve(UpdateAuthorService);

    const author = await updateAuthorService.execute(id, { name });

    return response.status(200).json({
      message: 'Author updated successfully',
      data: author,
    });
  }
}
