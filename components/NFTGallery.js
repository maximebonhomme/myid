import { useMoralisWeb3Api } from 'react-moralis';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setNFTs } from '../reducers/nfts';

import { processNfts } from '../helpers/decode';

const NFTGallery = () => {
  const dispatch = useDispatch();
  const Web3Api = useMoralisWeb3Api();
  const address = useSelector((state) => state.wallet.address);
  const nfts = useSelector((state) => state.nfts.result);

  const getUserNFTs = async () => {
    const _nfts = await Web3Api.account.getNFTs({
      address: address
    });

    console.log('_nfts', _nfts);

    const results = await processNfts(_nfts);

    dispatch(setNFTs(results));
  };

  useEffect(() => {
    getUserNFTs();
  }, [address]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {nfts.length > 0 &&
        nfts.map((nft) => {
          if (!nft.videoURI && !nft.imageURI) return null;

          if (nft.videoURI && nft.videoURI.includes('.mp4')) {
            return (
              <video autoPlay loop>
                <source src={nft.videoURI} type="video/mp4" />
              </video>
            );
          }

          return (
            <img
              key={nft.token_id}
              className="nft"
              src={nft.imageURI}
              alt={nft.name}
            />
          );
        })}
    </div>
  );
};

export default NFTGallery;
