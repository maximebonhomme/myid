import axios from 'axios';

export const decodeBase64 = (base64) => {
  const json = atob(base64.substring(29));

  return JSON.parse(json);
};

const getIPFSURL = async (tokenURI) => {
  const url = `https://ipfs.io/ipfs/${tokenURI.substring(7)}`;
  const json = await axios.get(url);
  sdfsdfsdfsdfsfsdf;
  return {
    ...json.data,
    image: `https://ipfs.io/ipfs/${json.data.image.substring(7)}`
  };
};

export const processTokenURI = async (tokenURI, tokenId) => {
  // console.log('tokenURItokenURI', tokenURI);
  // console.log("tokenURI.includes('https://')", tokenURI.includes('https://'));

  if (tokenURI.includes('ipfs://')) {
    return await getIPFSURL(tokenURI);
  } else if (tokenURI.includes('data:application/json')) {
    return decodeBase64(tokenURI);
  } else if (tokenURI.includes('https://')) {
    try {
      const json = await axios.post('/api/metadata', { tokenURI });

      return {
        ...json.data
      };
    } catch (error) {
      console.log(error);
    }
  }

  return tokenURI;
};

export const getImageURI = async (metadata) => {
  const image = metadata.image || metadata.image_url;
  const video = metadata.animation_url;

  console.log('image', image);

  if (image.startsWith('ipfs://')) {
    const url = `https://ipfs.io/ipfs/${image.substring(7)}`;

    return {
      imageURI: url,
      videoURI: video
    };
  }

  return {
    imageURI: image || imageUrl,
    videoURI: video
  };
};

export const processNfts = async (_nfts) => {
  const result = [];

  for (const nft of _nfts.result) {
    const metadata = nft.metadata ? JSON.parse(nft.metadata) : null;
    const URI = metadata ? await getImageURI(metadata) : null;
    const tokenURI = nft.token_uri
      ? await processTokenURI(nft.token_uri)
      : null;
    const tokenURIimage = tokenURI ? tokenURI.image : null;

    const _item = {
      ...nft,
      imageURI: URI ? URI.imageURI : tokenURIimage,
      videoURI: URI ? URI.videoURI : null
    };

    // console.log('URI', URI);
    // console.log('tokenURI', tokenURI);

    result.push(_item);

    if (!URI?.imageURI && !URI?.videoURI) {
      console.log('nft no URI', nft);
      console.log('tokenURI', tokenURI);
    }
  }

  return {
    ..._nfts,
    list: result
  };
};
