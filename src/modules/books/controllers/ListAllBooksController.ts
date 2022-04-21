import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllBooksService } from '../services/ListAllBooksService';

export class ListAllBooksController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { offset, limit, publisher, author, category, order } = request.query;

    const listAllBooksService = container.resolve(ListAllBooksService);

    const books = await listAllBooksService.execute({
      offset: offset ? Number(offset) : 1,
      limit: limit ? Number(limit) : 10,
      order: order ? String(order) : 'ASC',
      author: author ? String(author) : undefined,
    });

    return response.status(200).json({
      message: 'Books listed successfully',
      data: books,
    });
  }
}
