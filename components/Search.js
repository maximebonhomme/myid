import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import throttle from 'lodash/throttle';
import { useDispatch } from 'react-redux';

import { setAddress, setBalance, setEns } from '../reducers/wallet';

const Search = () => {
  const { web3, isWeb3Enabled } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
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
    const address = event.target.value;
    const ens = await resolveEns(address);
    const isValid = address.startsWith('0x') || address.endsWith('.eth');

    if (isValid) {
      dispatch(setAddress(address));
      dispatch(setEns(ens));
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <input className="search" onChange={throttle(handleChange, 400)} />
    </div>
  );
};

export default Search;
