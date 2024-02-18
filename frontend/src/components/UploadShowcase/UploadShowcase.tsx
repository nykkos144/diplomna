import { useEffect, useState } from 'react';
import styles from './UploadShowcase.module.css';

import closeX from './../../assets/icons/close-x.svg';

import UploadField from '../UploadField/UploadField';
import ImageCrop from '../ImageCrop/ImageCrop';
import Button from '../Button/Button';
import { IUpload } from '../../interfaces/upload.interface';


const UploadShowcase = ({
  
  type,
  accept,

  value,
  updateValue,
  removeValue

}: IUpload & {

  value: File [],
  updateValue: (value: File []) => void;
  addValue?: (value: File) => void;
  removeValue: (type: 'value' | 'index', value: string | number) => void;

}) => {

  const multiple = type === 'multiple';

  const [imageURLs, setImageURLs] = useState<string []>([]);

  useEffect(() => {

    if (!value || value.length === 0) {
      setImageURLs([]);
    }

  }, [value])

  const updateImages = (newImages: File []) => {

    if (!newImages) {
      return;
    }

    if (type === 'single' || type === 'crop') {

      updateValue([newImages[0]]);
      setImageURLs([URL.createObjectURL(newImages[0])]);
      
      return;

    }

    const slicedImages = newImages.slice(0, 6 - value.length);

    updateValue([...value, ...slicedImages]);
    setImageURLs([
      ...imageURLs,
      ...slicedImages.map((image: File) => URL.createObjectURL(image))
    ]);

  }

  const updateCroppedImage = (newImage: File) => {

    updateValue([newImage]);

  }

  const handleRemove = (index: number) => {

    removeValue('index', index);
    setImageURLs(imageURLs.filter((_, ind: number) => ind !== index));

  }

  return (

    <div className={ `${ styles.container } ${ styles[type] }` }>

      { (multiple || (!multiple && value.length === 0)) && (

        <UploadField
          accept={ accept }
          multiple={ multiple }
          updateImages={ updateImages }
        />

      )}

      { (value && value.length > 0 && imageURLs.length > 0) && (

        <div className={ styles.imageContainer }>

          { type === 'multiple' ? (

              imageURLs.map((url: string, index: number) => {

                return (
                  <div key={ index } className={ styles.image } style={{ backgroundImage: `url(${ url })` }} onClick={() => handleRemove(index)}>
                    <div></div>
                    <img src={ closeX } />
                  </div>
                );

              })

          ) : type === 'single' ? (

            <div className={ styles.image } style={{ backgroundImage: `url(${ imageURLs[0] })` }} onClick={() => handleRemove(0)}>
              <div></div>
              <img src={ closeX } />
            </div>
          
          ) : type === 'crop' ? (

            <div className={ styles.cropContainer }>

              <ImageCrop
                image={ imageURLs[0] }
                setCroppedImage={ updateCroppedImage }
              />

              <div className={ styles.button }>

                <Button
                  type='secondary'
                  handleClick={() => handleRemove(0)}
                  icon={ closeX }
                  iconSize='10px'
                  width='34px'
                  height='34px'
                />

              </div>
            
            </div>

          ) : ''}

        </div>
      
      )}


    </div>

  );

}


export default UploadShowcase;
