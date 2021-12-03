import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 0,
  list: [],
  status: 'idle'
};

export const nftsSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setNFTs: (state, action) => {
      const { page, list } = action.payload;
      state.page = page;
      state.list = list;
    },
    addNFTs: (state, action) => {
      state.list.push(...action.payload);
    },
    updateNFTs: (state, action) => {
      const { page, list, status } = action.payload;
      state.page = page;
      state.status = status;
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
