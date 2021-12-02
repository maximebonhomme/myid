import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 0,
  pageSize: 0,
  result: [],
  status: null,
  total: 0,
  list: []
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
    addNFTs: (state, action) => {
      state.list.push(...action.payload);
    },
    updateNFTs: (state, action) => {
      const { page, page_size, result, status, total, list } = action.payload;
      state.page = page;
      state.pageSize = page_size;
      state.result = result;
      state.status = status;
      state.total = total;
      state.list.push(...list);
    },
    clearNFTs: () => initialState
  }
});

export const { setNFTs, addNFT, clearNFTs, updateNFTs } = nftsSlice.actions;

export default nftsSlice.reducer;
