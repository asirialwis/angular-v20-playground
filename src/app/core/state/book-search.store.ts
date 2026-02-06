import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Book } from '../../shared/models/book.model';

type BookSearchState = {
  books: Book[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BookSearchState = {
  books: [],
  isLoading: false,
  filter: { query: '', order: 'asc' }
};

export const BookSearchStore = signalStore(
  withState(initialState),
  withComputed((store) => ({

  }))
);