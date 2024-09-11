import {createSlice} from '@reduxjs/toolkit';
//import { useSelector } from 'react-redux';//need in BookView

const initialState = {
  BookItemProp: 11,
}
export const LibrarySlice = createSlice({
    name: 'book',
    initialState,
    reducers: { setBook: (state) => {
      state.BookItemProp = actions.payload
    },},//updates the variable
});
export const {setBook} = LibrarySlice.actions
export default LibrarySlice.reducers