import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Base64 } from 'js-base64';

import WalletConnect from '../components/WalletConnect';

import { getProvider } from '../controllers/wallet';

import styles from '../styles/Home.module.css';
import { getBalance } from '../controllers/wallet';
import { getERC721ByAddress } from '../controllers/token';
import { getContractABI } from '../controllers/contract';

export default function Home() {
  const [tokenURI, setTokenURI] = useState(null);
  const fetchBalance = async () => {
    const balance = await getBalance('biron.eth');

    console.log('balance', balance);
    // const fsd = await getERC721ByAddress(
    //   '0xff5fe6e0d3d48c90a66217dd4a7560a3ed8dacd2'
    // );

    // const abi = await getContractABI(
    //   '0x25ed58c027921e14d86380ea2646e3a1b5c55a8b'
    // );
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const contract = new ethers.Contract(
    //   '0x25ed58c027921e14d86380ea2646e3a1b5c55a8b',
    //   abi.data,
    //   provider
    // );
    // const _tokenURI = await contract.tokenURI('123');
    // console.log('tokenURI', _tokenURI);
    // console.log('Base64.decode;', Base64.decode(_tokenURI));

    // // 29 = length of "data:application/json;base64,"
    // const json = atob(_tokenURI.substring(29));
    // const result = JSON.parse(json);
    // console.log('result', result);
    // setTokenURI(_tokenURI);
    // console.log('provider', provider);
    // console.log('contract', contract);
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div>
      <Toaster />
      <WalletConnect />
      {tokenURI && <img src={tokenURI} />}

      <div className={styles.container}>Hello world</div>
    </div>
  );
}
