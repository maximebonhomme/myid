import { Provider } from 'react-redux';
import { MoralisProvider } from 'react-moralis';

import Web3 from './_web3';

import store from '../store';

import config from '../config';

import '../styles/globals.css';

const { moralisServer, moralisAppId } = config;

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MoralisProvider appId={moralisAppId} serverUrl={moralisServer}>
        <Web3 />
        <Component {...pageProps} />
      </MoralisProvider>
    </Provider>
  );
}

export default MyApp;
