import { useDispatch } from 'react-redux';

import { setVisibility } from '../reducers/search';

const Profile = ({ address, ens }) => {
  const dispatch = useDispatch();

  const trimedAdddress = `${address.slice(0, 4)}...${address.slice(
    address.length - 4,
    address.length
  )}`;

  const openSearch = () => {
    dispatch(setVisibility(true));
  };

  return (
    <div className="sticky top-0 bg-black z-profile">
      <div
        className="flex items-center justify-center text-18"
        style={{ height: 260 }}
      >
        <h2 className="text-center cursor-pointer" onClick={openSearch}>
          {ens || trimedAdddress}
        </h2>
      </div>
      <div className="flex">
        <div className="py-5 border-solid border-b-1 border-white text-center flex-1 cursor-pointer">
          Collection
        </div>
        <div className="py-5 text-white-light border-solid border-b-1 border-white-lighter text-center flex-1 cursor-pointer">
          Balance
        </div>
        <div className="py-5 text-white-light border-solid border-b-1 border-white-lighter text-center flex-1 cursor-pointer">
          Activity
        </div>
      </div>
    </div>
  );
};

export default Profile;
