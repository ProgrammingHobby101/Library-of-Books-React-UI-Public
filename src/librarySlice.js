import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    BookCreateModalTitle: "my test title",
    BookCreateModalDescription: "my test title",
    ShowBookCreateModal: false,
}

export const librarySlice = createSlice({
name: 'library',
initialState,
reducers: {//mutate here
        setBookCreateModalTitle: (state, action) => {
            state.BookCreateModalTitle = action.payload;
        },
        
        setBookCreateModalDescription: (state, action) => {
            state.BookCreateModalDescription = action.payload;
        },
        setShowBookCreateModal: (state, action) => {
            state.ShowBookCreateModal = action.payload;         
        },
    }
});

export const { setBookCreateModalTitle, 
               setBookCreateModalDescription, 
               setShowBookCreateModal 
             } = librarySlice.actions;
export default librarySlice.reducer;