import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import WalletConnect from '../components/WalletConnect';
import NFTGallery from '../components/NFTGallery';
import Search from '../components/Search';
import Profile from '../components/Profile';
import Header from '../components/Header';

export default function Home() {
  const { address, ens } = useSelector((state) => state.search);

  return (
    <>
      <Toaster />
      <Header />
      {/* <WalletConnect /> */}

      <Search />
      {address && (
        <>
          <Profile address={address} ens={ens} />
          <NFTGallery />
        </>
      )}
    </>
  );
}
