import { useSelector } from 'react-redux';

import NFTGallery from '../components/NFTGallery';
import Search from '../components/Search';
import Profile from '../components/Profile';
import Header from '../components/Header';

export default function Home() {
  const { address, ens } = useSelector((state) => state.search);

  return (
    <div className="mx-auto" style={{ maxWidth: '600px' }}>
      <Header />
      <Search />
      {address && (
        <>
          <Profile address={address} ens={ens} />
          <NFTGallery />
        </>
      )}
    </div>
  );
}
