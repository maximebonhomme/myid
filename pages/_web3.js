import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

const Web3 = () => {
  const { enableWeb3, isWeb3Enabled } = useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [isWeb3Enabled, enableWeb3]);

  return null;
};

export default Web3;
