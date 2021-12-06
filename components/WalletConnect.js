import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

import { setBalance, setAddress } from '../reducers/wallet';
import { getEns } from '../helpers/web3';

const WalletConnect = () => {
  const { authenticate, isAuthenticated, user, web3 } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const dispatch = useDispatch();

  const handleAuthenticate = () => {
    authenticate({ signingMessage: 'Signing to localhost baby' });
  };

  const setAccount = async () => {
    if (isAuthenticated) {
      const address = user.get('ethAddress');
      const ens = await getEns(web3, address);
      console.log('ens', ens);
      dispatch(setAddress(address));

      const balanceResponse = await Web3Api.account.getNativeBalance({
        chain: 'eth',
        address: address
      });

      dispatch(setBalance(balanceResponse.balance));
    }
  };

  const toggleMenu = () => {
    console.log('toggle menu');
  };

  useEffect(() => {
    setAccount();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="flex">
      {isAuthenticated ? (
        <button onClick={toggleMenu}>
          <img width={32} height={32} src="/img/icon-menu.svg" />
        </button>
      ) : (
        <button className="text-16" onClick={handleAuthenticate}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
