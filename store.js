import { configureStore } from '@reduxjs/toolkit';

import wallet from './reducers/wallet';
import nfts from './reducers/nfts';
import search from './reducers/search';

export function makeStore() {
  return configureStore({
    reducer: { wallet, nfts, search }
  });
}

const store = makeStore();

export default store;
