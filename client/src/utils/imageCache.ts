const imageCache: Record<string, HTMLImageElement> = {};

export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (imageCache[src]) {
      resolve(imageCache[src]);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      imageCache[src] = img;
      resolve(img);
    };
    img.onerror = reject;
  });
};

export const getCachedImage = (src: string): HTMLImageElement | undefined => {
  return imageCache[src];
};
