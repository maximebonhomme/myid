import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import axios from 'axios';

import { updateNFTs, setStatus } from '../reducers/nfts';

import config from '../config';

const NFTGallery = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.search);
  const nfts = useSelector((state) => state.nfts.list);
  const { page, status } = useSelector((state) => state.nfts, shallowEqual);

  const handleLoadMore = async () => {
    dispatch(setStatus('loading'));
    try {
      const opensea = await axios.get('/api/nfts', {
        params: {
          address,
          limit: config.listLimit,
          offset: (page + 1) * config.listLimit
        }
      });

      dispatch(
        updateNFTs({
          list: opensea.data.assets,
          page: page + 1,
          status: 'idle'
        })
      );
    } catch (error) {
      dispatch(setStatus('error'));
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex mt-15 px-8 flex-wrap">
        {nfts.length > 0 &&
          nfts.map((nft) => {
            if (!nft.image_url) return null;

            if (nft.animation_url && nft.animation_url.includes('.mp4')) {
              return (
                <video autoPlay loop className="w-1/2" muted>
                  <source src={nft.animation_url} type="video/mp4" />
                </video>
              );
            }

            return (
              <img
                key={nft.token_id}
                className="w-1/2"
                src={nft.image_url}
                alt={nft.name}
              />
            );
          })}
      </div>
      <>{status === 'loading' && <div>Fetching NFTs...</div>}</>
      <>{status === 'error' && <div>Something went wrong check console</div>}</>
      <div className="text-center py-25">
        {(page + 1) * config.listLimit <= nfts.length && (
          <button
            className="py-8 px-15 bg-white text-black rounded-m"
            onClick={handleLoadMore}
          >
            Load more...
          </button>
        )}{' '}
      </div>
    </>
  );
};

export default NFTGallery;
