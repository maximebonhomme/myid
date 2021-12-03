import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import { updateNFTs, setStatus, setNFTs } from '../reducers/nfts';

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

  const handleRefresh = async () => {
    dispatch(setStatus('loading'));
    try {
      const opensea = await axios.get('/api/nfts', {
        params: {
          address,
          limit: config.listLimit,
          offset: 0
        }
      });

      dispatch(
        setNFTs({
          list: opensea.data.assets,
          page: 0,
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
        <InfiniteScroll
          dataLength={nfts.length} //This is important field to render the next data
          next={handleLoadMore}
          hasMore={(page + 1) * config.listLimit <= nfts.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          className="flex mt-15 px-8 flex-wrap"
          refreshFunction={handleRefresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <div className="text-center py-5 w-full">Pull down to refresh</div>
          }
          releaseToRefreshContent={
            <div className="text-center py-5 w-full">Release to refresh</div>
          }
        >
          {nfts.map((nft) => {
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
        </InfiniteScroll>
      </div>
      <>{status === 'error' && <div>Something went wrong check console</div>}</>
    </>
  );
};

export default NFTGallery;
