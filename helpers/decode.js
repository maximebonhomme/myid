import axios from 'axios';

export const decodeBase64 = (base64) => {
  const json = atob(base64.substring(29));

  return JSON.parse(json);
};

export const processTokenURI = async (tokenURI, tokenId) => {
  console.log('tokenURItokenURI', tokenURI);
  console.log("tokenURI.includes('https://')", tokenURI.includes('https://'));

  if (tokenURI.includes('ipfs://')) {
    const url = `https://ipfs.io/ipfs/${tokenURI.substring(7)}`;
    const json = await axios.get(url);

    return {
      ...json.data,
      image: `https://ipfs.io/ipfs/${json.data.image.substring(7)}`
    };
  } else if (tokenURI.includes('data:application/json')) {
    return decodeBase64(tokenURI);
  } else if (tokenURI.includes('https://api.artblocks.io')) {
    return {
      image: `https://api.artblocks.io/image/${tokenId}`
    };
  } else if (tokenURI.includes('https://')) {
    const json = await axios.get(tokenURI);

    return {
      ...json.data
    };
  }

  return tokenURI;
};
