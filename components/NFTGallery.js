import { useMoralisWeb3Api } from 'react-moralis';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { updateNFTs, setStatus } from '../reducers/nfts';

import { processNfts } from '../helpers/decode';
import usePrevious from '../helpers/usePrevious';

import config from '../config';

const NFTGallery = () => {
  const [internalPage, setPage] = useState(1);
  const dispatch = useDispatch();
  const Web3Api = useMoralisWeb3Api();
  const { address } = useSelector((state) => state.search);
  const nfts = useSelector((state) => state.nfts.list);
  const { page, pageSize, total, status } = useSelector(
    (state) => state.nfts,
    shallowEqual
  );
  const previousAddress = usePrevious(address);

  // const getUserNFTs = async () => {
  //   dispatch(setStatus('loading'));

  //   const _nfts = await Web3Api.account.getNFTs({
  //     address,
  //     limit: config.listLimit,
  //     offset: internalPage * config.listLimit
  //   });

  //   const results = await processNfts(_nfts);

  //   dispatch(updateNFTs(results));
  //   dispatch(setStatus('idle'));
  // };

  // const handleLoadMore = () => {
  //   const newPage = internalPage + 1;
  //   console.log('newPage', newPage);
  //   setPage(newPage);
  // };

  // useEffect(() => {
  //   getUserNFTs();

  //   if (previousAddress !== address) {
  //     setPage(0);
  //   }
  // }, [address, internalPage]);

  return (
    <div className="flex mt-15 px-8 flex-wrap">
      {nfts.length > 0 &&
        nfts.map((nft) => {
          if (!nft.videoURI && !nft.imageURI) return null;

          if (nft.videoURI && nft.videoURI.includes('.mp4')) {
            return (
              <video autoPlay loop className="nft">
                <source src={nft.videoURI} type="video/mp4" />
              </video>
            );
          }

          return (
            <img
              key={nft.token_id}
              className="w-1/2"
              src={nft.imageURI}
              alt={nft.name}
            />
          );
        })}
      <>{status === 'loading' && <div>Fetching NFTs...</div>}</>
      <>
        {internalPage + 1 * pageSize < total && (
          <button onClick={handleLoadMore}>load more</button>
        )}
      </>
    </div>
  );
};

export default NFTGallery;
