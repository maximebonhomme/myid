import { ethers } from 'ethers';
import config from '../config';
import axios from 'axios';
import { decodeBase64 } from '../helpers/decode';

export const getERC721ByAddress = async (address) => {
  try {
    const list = await axios.get(
      `${config.etherscanBaseURL}?module=account&action=tokennfttx&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${config.apiKey}`
    );

    return {
      status: 200,
      message: 'Token received',
      data: list.data.result
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Error while fetching ERC721 list',
      data: null
    };
  }
};

export const getTokenURI = async (contractAddress, abi, tokenId) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const tokenURI = await contract.tokenURI(tokenId);

    return {
      status: 200,
      message: 'TokenURI received',
      data: decodeBase64(tokenURI)
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null
    };
  }
};
