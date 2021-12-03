import { useDispatch } from 'react-redux';

import { setVisibility } from '../reducers/search';

const Header = () => {
  const dispatch = useDispatch();

  const openSearch = () => {
    dispatch(setVisibility(true));
  };

  const connectWallet = () => {
    console.log('not done yet');
  };

  return (
    <header className="flex justify-between items-center z-header absolute top-0 left-0 right-0 p-15">
      <img
        width="32"
        height="32"
        src="/img/icon-search.svg"
        alt="search icon"
        onClick={openSearch}
      />
      <p className="text-14" onClick={connectWallet}>
        Connect Wallet
      </p>
    </header>
  );
};

export default Header;
