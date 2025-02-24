import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    BookCreateModalTitle: "Error, missing title.",
    BookCreateModalDescription: "Error, missing description.",
    ShowBookCreateModal: false,
    UserBookItem: {},//bookJSON
}

export const librarySlice = createSlice({
name: 'library',
initialState,
reducers: {
        setBookCreateModalTitle: (state, action) => {
            state.BookCreateModalTitle = action.payload;
        },
        setBookCreateModalDescription: (state, action) => {
            state.BookCreateModalDescription = action.payload;
        },
        setShowBookCreateModal: (state, action) => {
            state.ShowBookCreateModal = action.payload;         
        },        
        setUserBookItem: (state, action) => {//mutate bookJSON
            state.UserBookItem = action.payload;
        }
    }
});

export const { setBookCreateModalTitle, 
               setBookCreateModalDescription, 
               setShowBookCreateModal,
               setUserBookItem, 
             } = librarySlice.actions;
export default librarySlice.reducer;