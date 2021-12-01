import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-css';

import { getContractABI } from '../controllers/contract';

import { getERC721ByAddress, getTokenURI } from '../controllers/token';

import {
  setTransactions,
  setNFTs,
  addNFT,
  clearNFTs
} from '../reducers/tokens';

const NFTGallery = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.wallet.address);
  const transactions = useSelector((state) => state.tokens.transactions);
  const nfts = useSelector((state) => state.tokens.nfts);

  const fetchTokens = async () => {
    if (!address) return;

    const response = await getERC721ByAddress(address);
    if (response.status === 200) {
      const result = response.data;
      dispatch(setTransactions(result));
      // console.log('transactions', result);
    }
  };

  const fetchTokenURIs = async () => {
    // const nfts = [];
    if (transactions.length <= 0) return;

    dispatch(clearNFTs());

    for (const tx of transactions) {
      const { contractAddress, tokenID, tokenName, tokenSymbol } = tx;
      const abi = await getContractABI(contractAddress);
      // console.log('abi', abi);
      const cleanABI = JSON.parse(abi.data);
      const tokenURI = await getTokenURI(contractAddress, cleanABI, tokenID);

      // console.log('cleanABI', cleanABI);
      // console.log('tokenURI', tokenURI);

      dispatch(
        addNFT({
          tokenId: tokenID,
          contractAddress,
          tokenName,
          tokenSymbol,
          ...tokenURI.data
        })
      );

      // nfts.push({
      //   tokenId: tokenID,
      //   contractAddress,
      //   tokenName,
      //   tokenSymbol,
      //   ...tokenURI.data
      // });
    }

    // console.log('nfts', nfts);
  };

  useEffect(() => {
    fetchTokenURIs();
  }, [transactions]);

  useEffect(() => {
    fetchTokens();
  }, [address]);

  return (
    <div>
      {nfts.length > 0 && (
        <Masonry
          breakpointCols={2}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {nfts.map((nft) => {
            if (!nft.image) return null;
            return (
              <img
                key={nft.tokenId}
                className="nft"
                src={nft.image}
                alt={nft.name}
              />
            );
          })}
        </Masonry>
      )}
    </div>
  );
};

export default NFTGallery;
