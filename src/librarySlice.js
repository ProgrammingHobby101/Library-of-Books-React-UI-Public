import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    BasicModalTitle: "Error, missing title.",
    BasicModalDescription: "Error, missing description.",
    ShowBasicModal: false,
    BookItemUsingModal: false,
    BookViewUsingModal: false,
    BookListUsingModal: false,
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
        setBookViewUsingModal: (state, action) => {//mutate
            state.BookViewUsingModal = action.payload;
        },
        setBookListUsingModal: (state, action) => {//mutate
            state.BookListUsingModal = action.payload;
        },
    }
});

export const { setBasicModalTitle, 
               setBasicModalDescription, 
               setShowBasicModal,
               setBookItemUsingModal,
               setBookViewUsingModal,
               setBookListUsingModal,
             } = librarySlice.actions;
export default librarySlice.reducer;