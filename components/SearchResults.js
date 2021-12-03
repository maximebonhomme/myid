import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MasonryGrid } from '@egjs/react-grid';

import { updateNFTs, setStatus, setNFTs } from '../reducers/nfts';

import config from '../config';
import { useEffect, useRef } from 'react';

const masonryOptions = {
  fitWidth: false,
  columnWidth: 300,
  gutter: 30,
  itemSelector: '.photo-item'
};

const NFTGallery = () => {
  const gridRef = useRef(null);
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

  useEffect(() => {
    if (status === 'idle') {
      console.log('re-rendere the grid u fuck');
      gridRef.current.renderItems();
    }
  }, [status]);

  return (
    <section className="mb-80">
      <div>
        <InfiniteScroll
          dataLength={nfts.length}
          next={handleLoadMore}
          hasMore={(page + 1) * config.listLimit <= nfts.length}
          // loader={<h4>Loading...</h4>}
          // endMessage={}
          // refreshFunction={handleRefresh}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={
          //   <div className="text-center py-5 w-full">Pull down to refresh</div>
          // }
          // releaseToRefreshContent={
          //   <div className="text-center py-5 w-full">Release to refresh</div>
          // }
        >
          <MasonryGrid
            ref={gridRef}
            gap={8}
            defaultDirection="end"
            align="justify"
            column={2}
            columnSize={0}
            columnSizeRatio={0}
            className="overflow-hidden"
            // onRenderComplete={handleGridRenderComplete}
          >
            {nfts.map((nft) => {
              if (!nft.image_url) return null;

              if (nft.animation_url && nft.animation_url.includes('.mp4')) {
                return (
                  <div className="w-1/2 block" key={nft.token_id}>
                    <video autoPlay loop className="w-full" muted>
                      <source src={nft.animation_url} type="video/mp4" />
                    </video>
                  </div>
                );
              }

              return (
                <div className="w-1/2" key={nft.token_id}>
                  {/* <div className="p-5 w-full"> */}
                  <img
                    className="block w-full"
                    src={nft.image_url}
                    alt={nft.name}
                  />
                  {/* </div> */}
                </div>
              );
            })}
          </MasonryGrid>
        </InfiniteScroll>
      </div>
      <>{status === 'error' && <div>Something went wrong check console</div>}</>
    </section>
  );
};

export default NFTGallery;
