import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

import { setBalance, setAddress } from '../reducers/wallet';

import Avatar from './Avatar';

const WalletConnect = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const dispatch = useDispatch();

  const handleAuthenticate = () => {
    authenticate({ signingMessage: 'Signing to localhost baby' });
  };

  const setAccount = async () => {
    if (isAuthenticated) {
      const address = user.get('ethAddress');
      dispatch(setAddress(address));

      const balanceResponse = await Web3Api.account.getNativeBalance({
        chain: 'eth',
        address: address
      });

      dispatch(setBalance(balanceResponse.balance));
    }
  };

  useEffect(() => {
    setAccount();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="connect">
      {isAuthenticated ? (
        <Avatar address={user.get('ethAddress')} ens={null} onClick={logout} />
      ) : (
        <button onClick={handleAuthenticate}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
