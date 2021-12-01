import { ethers } from 'ethers';

export const getProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return {
    status: 200,
    message: 'Provider found',
    data: provider
  };
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
