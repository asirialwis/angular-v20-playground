import { signalStore, withComputed, withState } from '@ngrx/signals';
import {IBook} from '../interfaces/Ibook'

type BookSearchState = {
    books: IBook[];
    isLoading:boolean;
    filter:{query:string; order:'asc'| 'desc'}
};

const initialState: BookSearchState = {
    books:[],
    isLoading:false,
    filter:{query:'',order:'asc'}
};

export const BookSearchStore = signalStore(withState(initialState),

    withComputed((store)=>({
        
    }))
)



