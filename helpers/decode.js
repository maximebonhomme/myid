export const decodeBase64 = (base64) => {
  const json = atob(base64.substring(29));

  return JSON.parse(json);
};
