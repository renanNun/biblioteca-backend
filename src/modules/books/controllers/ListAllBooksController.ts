import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllBooksService } from '../services/ListAllBooksService';

export class ListAllBooksController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { offset, limit, publisher, author, category } = request.query;

    const listAllBooksService = container.resolve(ListAllBooksService);

    const books = await listAllBooksService.execute({
      offset: Number(offset),
      limit: Number(limit),
      publisher: String(publisher) || '*',
      author: String(author),
      category: String(category),
    });

    return response.status(200).json({
      message: 'Books listed successfully',
      data: books,
    });
  }
}
