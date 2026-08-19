export interface ImageAsset {
  url: string;
  blob?: Blob;
  bitmap?: ImageBitmap;
}

const assetMap = new Map<string, ImageAsset>();

export const setAsset = (url: string, asset: ImageAsset): void => {
  assetMap.set(url, asset);
};

export const getAsset = (url: string): ImageAsset | undefined => {
  return assetMap.get(url);
};

export const removeAsset = (url: string): void => {
  const asset = assetMap.get(url);
  if (asset?.url && asset.url.startsWith('blob:')) {
    URL.revokeObjectURL(asset.url);
  }
  assetMap.delete(url);
};

export const clearAssets = (): void => {
  assetMap.forEach((asset) => {
    if (asset.url && asset.url.startsWith('blob:')) {
      URL.revokeObjectURL(asset.url);
    }
  });
  assetMap.clear();
};
