import { createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    address: null,
    ens: null,
    balance: null
  },
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setEns: (state, action) => {
      state.ens = action.payload;
    },
    saveAddresses: (state, action) => {
      const { address, ens } = action.payload;
      state.address = address;
      state.ens = ens;
    }
  }
});

export const { setBalance, setAddress, setEns, saveAddresses } =
  walletSlice.actions;

export default walletSlice.reducer;
