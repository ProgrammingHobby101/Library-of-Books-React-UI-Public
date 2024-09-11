import { configureStore } from '@reduxjs/toolkit'; 
import setBook from './LibrarySlice'; 
export const store = configureStore({ reducer: { book: setBook, }, });