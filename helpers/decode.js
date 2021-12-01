export const decodeBase64 = (base64) => {
  const json = atob(_tokenURI.substring(29));

  return JSON.parse(json);
};
