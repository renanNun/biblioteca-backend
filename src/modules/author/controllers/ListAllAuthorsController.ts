import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllAuthorService } from '../services/ListAllAuthorsService';

export class ListAllAuthorsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { offset, limit } = request.query;

    const listAuthorService = container.resolve(ListAllAuthorService);

    const author = await listAuthorService.execute({
      offset: offset ? Number(offset) : 1,
      limit: limit ? Number(limit) : 10,
    });

    return response.status(200).json({
      message: 'Authors found successfully',
      data: author,
    });
  }
}
