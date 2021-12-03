/* eslint-disable @next/next/no-img-element */
import { useMoralis } from 'react-moralis';
import throttle from 'lodash/throttle';
import { useDispatch, useSelector } from 'react-redux';

import { saveAddresses } from '../reducers/wallet';
import { clearNFTs } from '../reducers/nfts';
import { useEffect, useState } from 'react';

import { setVisibility } from '../reducers/search';

const Search = () => {
  const { web3, isWeb3Enabled } = useMoralis();
  const dispatch = useDispatch();
  const [hasValue, setHasValue] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const { isVisible } = useSelector((state) => state.search);

  const resolveEns = async (ens) => {
    const recordExists = await web3.eth.ens.recordExists(ens);
    let address = null;

    if (!recordExists) return null;

    try {
      address = await web3.eth.ens.getAddress(ens);
    } catch (error) {
      console.log(error);
    }

    return address;
  };

  const resolveAddress = async (address) => {
    try {
      await web3.eth.getBalance(address);
      return address;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleKeyPress = (event) => {
    setError(false);

    if (event.key === 'Enter') {
      setValue(event.target.value);
    }
  };

  const handleChange = (event) => {
    setHasValue(!!event.target.value);
  };

  const saveAddress = (address, ens) => {
    dispatch(
      saveAddresses({
        address,
        ens
      })
    );

    dispatch(setVisibility(false));
  };

  const handleSearch = async () => {
    dispatch(clearNFTs());

    if (value.startsWith('0x')) {
      const address = await resolveAddress(value);

      if (address) {
        saveAddress(address, null);
      } else {
        setError(true);
      }
    } else if (value.endsWith('.eth')) {
      try {
        const address = await resolveEns(value);

        saveAddress(address, value);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (hasValue) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!isWeb3Enabled) return null;

  return (
    <div
      className={`p-15 fixed z-search top-0 left-0 bottom-0 right-0 bg-black flex items-center justify-center ${
        !isVisible && 'hidden'
      }`}
    >
      <div
        className={`flex w-full text-18 py-20 px-15 bg-white-lightest rounded-xl ${
          error ? 'shake' : ''
        }`}
      >
        <img
          width="32"
          height="32"
          src="/img/icon-search.svg"
          alt="search icon"
          className={`opacity-${hasValue ? '1' : '03'} mr-5`}
        />
        <input
          className={`bg-transparent w-full placeholder-current::placeholder focus:text-white text-${
            hasValue ? 'white' : 'white-lighter'
          }`}
          placeholder="Enter ENS or wallet address"
          onKeyPress={throttle(handleKeyPress, 400)}
          onChange={throttle(handleChange, 400)}
        />

        <img
          width="32"
          height="32"
          src="/img/icon-return.svg"
          alt="search icon"
          className={`ml-auto cursor-pointer ${!hasValue && 'hidden'}`}
          onClick={throttle(handleSearch, 400)}
        />
      </div>
    </div>
  );
};

export default Search;
