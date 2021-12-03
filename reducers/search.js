import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'tokens',
  initialState: {
    isVisible: true,
    address: null,
    ens: null
  },
  reducers: {
    setVisibility: (state, action) => {
      state.isVisible = action.payload;
    },
    saveAddresses: (state, action) => {
      const { address, ens } = action.payload;
      state.address = address;
      state.ens = ens;
    }
  }
});

export const { setVisibility, saveAddresses } = searchSlice.actions;

export default searchSlice.reducer;
