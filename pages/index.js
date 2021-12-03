import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import WalletConnect from '../components/WalletConnect';
import NFTGallery from '../components/NFTGallery';
import Search from '../components/Search';
import Profile from '../components/Profile';
import Header from '../components/Header';

export default function Home() {
  const wallet = useSelector((state) => state.wallet);

  return (
    <>
      <Toaster />
      <Header />
      {/* <WalletConnect /> */}

      <Search />
      {wallet.address && (
        <>
          <Profile address={wallet.address} ens={wallet.ens} />
          <NFTGallery />
        </>
      )}
    </>
  );
}
