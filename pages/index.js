import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import WalletConnect from '../components/WalletConnect';

import { getProvider } from '../controllers/wallet';

import styles from '../styles/Home.module.css';

export default function Home() {
  useEffect(() => {
    const provider = getProvider();

    console.log('provider', provider);
  }, []);

  return (
    <div>
      <Toaster />
      <WalletConnect />
      <div className={styles.container}>Hello world</div>
    </div>
  );
}
