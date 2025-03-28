import { createSlice } from '@reduxjs/toolkit'
import { BookCreate } from './MyComponents/BookCreate';
const initialState = {
    BasicModalTitle: "Error, missing title.",
    BasicModalDescription: "Error, missing description.",
    ShowBasicModal: false,
    BookItemUsingModal: false,
}

export const librarySlice = createSlice({
name: 'library',
initialState,
reducers: {
        setBasicModalTitle: (state, action) => {
            state.BasicModalTitle = action.payload;
        },
        setBasicModalDescription: (state, action) => {
            state.BasicModalDescription = action.payload;
        },
        setShowBasicModal: (state, action) => {
            state.ShowBasicModal = action.payload;         
        },
        setBookItemUsingModal: (state, action) => {//mutate
            state.BookItemUsingModal = action.payload;
        },
    }
});

export const { setBasicModalTitle, 
               setBasicModalDescription, 
               setShowBasicModal,
               setBookItemUsingModal,
             } = librarySlice.actions;
export default librarySlice.reducer;