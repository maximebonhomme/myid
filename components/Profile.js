const Profile = ({ address, ens }) => {
  const trimedAdddress = `${address.slice(0, 4)}...${address.slice(
    address.length - 4,
    address.length
  )}`;

  return (
    <div
      className="flex items-center justify-center text-18"
      style={{ height: 260 }}
    >
      <h2 style={{ textAlign: 'center' }}>{ens || trimedAdddress}</h2>
    </div>
  );
};

export default Profile;
