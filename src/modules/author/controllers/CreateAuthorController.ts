import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAuthorService } from '../services/CreateAuthorService';

export class CreateAuthorController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createAuthorService = container.resolve(CreateAuthorService);

    const author = await createAuthorService.execute({ name });

    return response.status(201).json({
      message: 'Author created successfully',
      data: author,
    });
  }
}
