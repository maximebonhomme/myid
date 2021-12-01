import { createSlice } from '@reduxjs/toolkit';

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState: {
    transactions: [],
    nfts: []
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setNFTs: (state, action) => {
      state.nfts = action.payload;
    }
  }
});

export const { setTransactions, setNFTs } = tokensSlice.actions;

export default tokensSlice.reducer;
