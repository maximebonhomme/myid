import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import WalletConnect from '../components/WalletConnect';
import NFTGallery from '../components/NFTGallery';
import Search from '../components/Search';

export default function Home() {
  const wallet = useSelector((state) => state.wallet);

  return (
    <div>
      <Toaster />
      <WalletConnect />

      <Search />
      {wallet.address && (
        <h2 style={{ textAlign: 'center' }}>{wallet.ens || wallet.address}</h2>
      )}
      <NFTGallery />
    </div>
  );
}
