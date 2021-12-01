import { ethers } from 'ethers';
import config from '../config';

export const getERC721ByAddress = async (address) => {
  try {
    const list = await fetch(
      `${config.etherscanBaseURL}?module=account&action=tokennfttx&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${config.apiKey}`
    );

    return {
      status: 200,
      message: 'Token received',
      data: list
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Error while fetching ERC721 list',
      data: null
    };
  }
};

export const getTokenURI = async (contract) => {
  try {
    return {
      status: 200,
      message: 'TokenURI received',
      data: list
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Error while getting token URI',
      data: null
    };
  }
};
