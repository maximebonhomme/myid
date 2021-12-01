import throttle from 'lodash/throttle';
import { useDispatch } from 'react-redux';

import { setAddress, setBalance, setEns } from '../reducers/wallet';

import { getBalance, getEns, getRawAddress } from '../controllers/wallet';

const Search = () => {
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const _address = event.target.value;

    const addressResponse = await getRawAddress(_address);

    console.log('addressResponse', addressResponse);

    if (addressResponse.status === 200) {
      const address = addressResponse.data;
      const ens = await getEns(address);
      const balance = await getBalance(address);

      dispatch(setAddress(address));
      dispatch(setBalance(balance.data));
      dispatch(setEns(ens.data));
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <input className="search" onChange={throttle(handleChange, 400)} />
    </div>
  );
};

export default Search;
