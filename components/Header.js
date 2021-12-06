/* eslint-disable @next/next/no-img-element */
import { useDispatch } from 'react-redux';

import WalletConnect from './WalletConnect';

import { setVisibility } from '../reducers/search';

const Header = () => {
  const dispatch = useDispatch();

  const openSearch = () => {
    dispatch(setVisibility(true));
  };

  return (
    <header className="flex justify-between items-center z-header fixed top-0 left-0 right-0 p-15">
      <img
        className="cursor-pointer"
        width="32"
        height="32"
        src="/img/icon-search.svg"
        alt="search icon"
        onClick={openSearch}
      />
      <WalletConnect />
    </header>
  );
};

export default Header;
