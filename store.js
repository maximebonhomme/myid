import { configureStore } from '@reduxjs/toolkit';

import wallet from './reducers/wallet';
import tokens from './reducers/tokens';

export function makeStore() {
  return configureStore({
    reducer: { wallet, tokens }
  });
}

const store = makeStore();

export default store;
