export const createImage = (url: string): Promise<HTMLImageElement> => {

  return new Promise((resolve, reject) => {

    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.crossOrigin = 'anonymous';
    image.src = url;

  });

}

export default async function getCroppedImg(
  
  imageSrc: string,
  pixelCrop: { width: number; height: number; x: number; y: number }

): Promise<File | null> {

  const image = await createImage(imageSrc);

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {

    canvas.toBlob(

      (blob: Blob | null) => {

        if (!blob) {
          reject(new Error('Failed to create blob for cropped image'));
          return;
        }

        const file = new File([blob], 'croppedImage.jpg', { type: 'image/jpeg' });
        resolve(file);

      }, 'image/jpeg'

    );

  });

}
