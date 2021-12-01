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
    },
    clearNFTs: (state) => {
      state.nfts = [];
    },
    addNFT: (state, action) => {
      state.nfts.push(action.payload);
    }
  }
});

export const { setTransactions, setNFTs, clearNFTs, addNFT } =
  tokensSlice.actions;

export default tokensSlice.reducer;
