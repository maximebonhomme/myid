import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { setBalance, setAddress, setEns } from '../reducers/wallet';

import {
  connectWallet,
  getCurrentConnectedWallet,
  getBalance,
  getEns
} from '../controllers/wallet';

import Avatar from './Avatar';

const WalletConnect = () => {
  const dispatch = useDispatch();

  const wallet = useSelector((state) => state.wallet);

  const setWallet = async (address) => {
    if (address) {
      const balance = await getBalance(address);
      const ens = await getEns(address);

      dispatch(setBalance(balance.data));
      dispatch(setAddress(address));
      dispatch(setEns(ens.data));
    }
  };

  const handleConnectWallet = async () => {
    const response = await connectWallet();
    const address = response.data[0];
    setWallet(address);
  };

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          toast.success('Wallet connected');
        } else {
          setWallet(null);
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
      setWallet(data[0]);

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
      {wallet.address ? (
        <Avatar address={wallet.address} ens={wallet.ens} />
      ) : (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
