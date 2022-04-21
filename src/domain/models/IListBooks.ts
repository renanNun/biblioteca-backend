export interface IListBooks {
  offset: number;
  limit: number;
  publisher?: string;
  author?: string;
  category?: string;
  order: string;
}
