export interface IListBooks {
  offset: number;
  limit: number;
  order: string;
  publisher?: string;
  author?: string;
  category?: string;
}
