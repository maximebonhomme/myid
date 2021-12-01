import { ethers } from 'ethers';

const getProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return provider;
};

export const getBalance = async (address) => {
  const provider = getProvider();

  try {
    const balance = await provider.getBalance(address);

    return {
      status: 200,
      message: 'Balance found',
      data: ethers.utils.formatEther(balance)
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null
    };
  }
};

export const getRawAddress = async (_address) => {
  const provider = getProvider();

  try {
    const address = await provider.resolveName(_address);

    if (!address) {
      return {
        status: 404,
        message: 'Address not found',
        data: null
      };
    }

    return {
      status: 200,
      message: 'Address found',
      data: address
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null
    };
  }
};

export const getEns = async (address) => {
  const provider = getProvider();

  try {
    const ens = await provider.lookupAddress(address);

    if (!ens) {
      return {
        status: 404,
        message: 'No ENS name found',
        data: null
      };
    }

    return {
      status: 200,
      message: 'ENS found',
      data: ens
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null
    };
  }
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      return {
        status: 200,
        message: 'Wallet connected',
        data: addressArray
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
        data: null
      };
    }
  } else {
    return {
      status: 404,
      message: 'No wallet found',
      data: null
    };
  }
};

export const getCurrentConnectedWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts'
      });

      if (addressArray.length > 0) {
        return {
          status: 200,
          message: 'Wallet connected',
          data: addressArray
        };
      } else {
        return {
          status: 500,
          message: 'Wallet not connected',
          data: null
        };
      }
    } catch (error) {
      return {
        status: 404,
        message: error.message,
        data: null
      };
    }
  }
};
