import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import throttle from 'lodash/throttle';
import { useDispatch } from 'react-redux';

import { setAddress, setEns } from '../reducers/wallet';
import { clearNFTs } from '../reducers/nfts';

const Search = () => {
  const { web3, isWeb3Enabled } = useMoralis();
  const dispatch = useDispatch();

  if (!isWeb3Enabled) return null;

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

  const handleChange = async (event) => {
    dispatch(clearNFTs());
    const value = event.target.value;

    if (value.startsWith('0x')) {
      const address = value;

      dispatch(setAddress(address));
      dispatch(setEns(null));
    } else if (value.endsWith('.eth')) {
      try {
        const address = await resolveEns(value);

        dispatch(setAddress(address));
        dispatch(setEns(value));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <input className="search" onChange={throttle(handleChange, 400)} />
    </div>
  );
};

export default Search;
