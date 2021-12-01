import { configureStore } from '@reduxjs/toolkit';

import wallet from './reducers/wallet';

export function makeStore() {
  return configureStore({
    reducer: { wallet }
  });
}

const store = makeStore();

export default store;
