import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
  selectedCategory: 'all',
  searchQuery: '',
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const contentId = action.payload;
      const index = state.bookmarks.indexOf(contentId);
      
      if (index > -1) {
        state.bookmarks.splice(index, 1);
      } else {
        state.bookmarks.push(contentId);
      }
      
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    },
    
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    clearBookmarks: (state) => {
      state.bookmarks = [];
      localStorage.removeItem('bookmarks');
    },
  },
});

export const { toggleBookmark, setCategory, setSearchQuery, clearBookmarks } = contentSlice.actions;
export default contentSlice.reducer;