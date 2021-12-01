import { ethers } from 'ethers';
import axios from 'axios';

import config from '../config';

export const getContractABI = async (contractAddress) => {
  try {
    const abi = await axios.get(
      `${config.etherscanBaseURL}?module=contract&action=getabi&address=${contractAddress}&apikey=${config.apiKey}`
    );

    if (abi.data.message === 'NOTOK') {
      return {
        status: 500,
        message: abi.data.result,
        data: null
      };
    }
    return {
      status: 200,
      message: 'ABI received',
      data: abi.data.result
    };
  } catch (error) {
    console.log('error', error.message);
    return {
      status: 500,
      message: error.message,
      data: null
    };
  }
};
