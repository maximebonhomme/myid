import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Avatar from './Avatar';

import {
  connectWallet,
  getCurrentConnectedWallet
} from '../controllers/wallet';

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const handleConnectWallet = async () => {
    const response = await connectWallet();
    const address = response.data[0];
    setWalletAddress(address);

    if (response.status === 200) {
      // toast.success(response.message)
    } else {
      // toast.error(response.message)
    }
  };

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          toast.success('Wallet connected');
        } else {
          setWalletAddress(null);
          toast.success('Wallet disconnected');
        }
      });
    } else {
      toast.error('No wallet found');
    }
  };

  useEffect(() => {
    async function fetchWallet() {
      const response = await getCurrentConnectedWallet();
      const { status, message, data } = response;
      setWalletAddress(data[0]);

      if (status === 200) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }

    fetchWallet();
    addWalletListener();
  }, []);

  return (
    <div className="connect">
      {walletAddress ? (
        <Avatar address={walletAddress} />
      ) : (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
