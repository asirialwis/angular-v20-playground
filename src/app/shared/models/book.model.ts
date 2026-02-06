export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  publishedYear?: number;
  price?: number;
}