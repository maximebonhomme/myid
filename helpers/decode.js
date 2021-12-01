import axios from 'axios';

export const decodeBase64 = (base64) => {
  const json = atob(base64.substring(29));

  return JSON.parse(json);
};

export const processTokenURI = async (tokenURI) => {
  if (tokenURI.includes('ipfs://')) {
    const url = `https://ipfs.io/ipfs/${tokenURI.substring(7)}`;
    const json = await axios.get(url);

    return {
      ...json.data,
      image: `https://ipfs.io/ipfs/${json.data.image.substring(7)}`
    };
  } else if (tokenURI.includes('data:application/json')) {
    return decodeBase64(tokenURI);
  }

  return tokenURI;
};
