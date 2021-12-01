import styles from '../styles/Home.module.css';

import { getProvider } from '../controllers/wallet';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const provider = getProvider();

    console.log('provider', provider);
  }, []);

  return <div className={styles.container}>Hello world</div>;
}
