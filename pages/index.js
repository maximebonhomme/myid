import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

import WalletConnect from '../components/WalletConnect';

export default function Home() {
  const [tokenURI, setTokenURI] = useState(null);
  const fetchBalance = async () => {};

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div>
      <Toaster />
      <WalletConnect />
    </div>
  );
}
