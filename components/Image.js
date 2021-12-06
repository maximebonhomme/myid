import { Image as NextImage } from 'next/image';
import { useEffect, useState } from 'react';

const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        URL.revokeObjectURL(img.src);
        if (width && height) resolve({ width, height });
        else reject(new Error('Missing image dimensions'));
      };
      img.src = url;
    } catch (err) {
      console.error(err);
      reject(new Error('getImageDimensions error'));
    }
  });
};

const Image = ({ src, alt }) => {
  const [imageSize, setImageSize] = useState(null);

  const setImageDimensions = async () => {
    try {
      const dimensions = await getImageDimensions(src);
      setImageSize({ width: dimensions.width, height: dimensions.height });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setImageDimensions();
  }, []);

  if (!imageSize) return null;

  return (
    <NextImage src={src} width={imageSize.width} height={imageSize.height} />
  );
};

export default Image;
