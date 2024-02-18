import { useState } from 'react';
import './ImageCrop.css';

// import image from './../../assets/images/kent-tupas-WaUcTYPfiCU-unsplash.jpg';

import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/crop.util';


const ImageCrop = ({

  image,
  setCroppedImage

}: {

  image: string,
  setCroppedImage: any

}) => {

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {

    if (croppedArea) {  }

    setCroppedImage(await getCroppedImg(image, croppedAreaPixels));

  }

  return (

    <div className='image-crop'>

      <Cropper
        image={ image }
        crop={ crop }
        zoom={ zoom }
        aspect={ 1 }
        objectFit='vertical-cover'
        onCropChange={ setCrop }
        onCropComplete={ onCropComplete }
        onZoomChange={ setZoom }
      />

    </div>

  );

}


export default ImageCrop;
