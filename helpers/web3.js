export const resolveEns = async (web3, ens) => {
  const recordExists = await web3.eth.ens.recordExists(ens);
  if (!recordExists) return null;

  try {
    const address = await web3.eth.ens.getAddress(ens);
    return address;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const resolveAddress = async (web3, address) => {
  try {
    await web3.eth.getBalance(address);
    return address;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBalance = async (web3, address) => {
  try {
    const balance = await web3.eth.getBalance(address);
    return balance;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getEns = async (web3, address) => {
  try {
    const ens = await web3.eth.ens;
    return ens;
  } catch (error) {
    console.log(error);
    return null;
  }
};
