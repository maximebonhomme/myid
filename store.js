import { configureStore } from '@reduxjs/toolkit';

import wallet from './reducers/wallet';
import nfts from './reducers/nfts';

export function makeStore() {
  return configureStore({
    reducer: { wallet, nfts }
  });
}

const store = makeStore();

export default store;
