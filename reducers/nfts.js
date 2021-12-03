import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 0,
  pageSize: 0,
  result: [],
  status: null,
  total: 0,
  list: [],
  status: 'idle'
};

export const nftsSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setNFTs: (state, action) => {
      const { page, page_size, result, status, total, list } = action.payload;
      state.page = page;
      state.pageSize = page_size;
      state.result = result;
      state.status = status;
      state.total = total;
      state.list = list;
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
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    clearNFTs: () => initialState
  }
});

export const { setNFTs, addNFT, clearNFTs, updateNFTs, setStatus } =
  nftsSlice.actions;

export default nftsSlice.reducer;