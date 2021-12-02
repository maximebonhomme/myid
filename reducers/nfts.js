import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 0,
  pageSize: 0,
  result: [],
  status: null,
  total: 0
};

export const nftsSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setNFTs: (state, action) => {
      const { page, page_size, result, status, total } = action.payload;
      state.page = page;
      state.pageSize = page_size;
      state.result = result;
      state.status = status;
      state.total = total;
    },
    clearNFTs: (state) => {
      state = initialState;
    }
  }
});

export const { setTransactions, setNFTs, clearNFTs, addNFT } =
  nftsSlice.actions;

export default nftsSlice.reducer;
