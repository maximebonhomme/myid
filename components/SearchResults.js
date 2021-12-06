/* eslint-disable @next/next/no-img-element */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MasonryGrid } from '@egjs/react-grid';

import { updateNFTs, setStatus, setNFTs } from '../reducers/nfts';

import config from '../config';
import { useEffect, useRef } from 'react';

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
      gridRef.current.renderItems();
    }
  }, [status]);

  return (
    <section className="mt-20 mb-80">
      <div>
        <InfiniteScroll
          dataLength={nfts.length}
          next={handleLoadMore}
          hasMore={(page + 1) * config.listLimit <= nfts.length}
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
                  <img
                    layout="fill"
                    objectFit="contain"
                    className="block w-full"
                    src={nft.image_url}
                    alt={nft.name}
                  />
                </div>
              );
            })}
          </MasonryGrid>
        </InfiniteScroll>
      </div>
      <>
        {status === 'error' && (
          <div>Something went wrong check console tyvm</div>
        )}
      </>
    </section>
  );
};

export default NFTGallery;
