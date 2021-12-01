import React from 'react';
import Image from 'next/image';

const Avatar = ({ address }) => {
  const trimedAdddress = `${address.slice(0, 4)}—${address.slice(
    address.length - 4,
    address.length
  )}`;
  return (
    <div className="profile">
      <img className="avatar" src="/img/avatar.png" alt={address} />
      <div className="address" title={address}>
        {trimedAdddress}
      </div>
    </div>
  );
};

export default Avatar;
