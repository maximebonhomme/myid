import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'tokens',
  initialState: {
    isVisible: true
  },
  reducers: {
    setVisibility: (state, action) => {
      state.isVisible = action.payload;
    }
  }
});

export const { setVisibility } = searchSlice.actions;

export default searchSlice.reducer;
