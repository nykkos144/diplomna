import { ChangeEvent, createRef, DragEvent } from 'react';
import styles from './UploadField.module.css';


const UploadField = ({

  accept,
  multiple,
  updateImages,
  width,
  height

}: {

  accept?: string [],
  multiple?: boolean,
  updateImages: (images: File []) => void
  width?: string,
  height?: string

}) => {

  const inputRef = createRef<HTMLInputElement>();

  const handleClick = () => {

    if (!inputRef) {
      return;
    }

    inputRef.current?.click();

  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    updateImages(Array.from(event.dataTransfer.files || []));
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    updateImages(Array.from(event.target.files || []));

  }

  return (

    <div className={ styles.container } style={{ width: width, height: height }} onClick={ handleClick } onDragOver={ handleDragOver } onDrop={ handleDrop }>

      <input
        ref={ inputRef }
        type='file'
        accept={ accept?.join(', ') }
        multiple={ multiple }
        onChange={ handleChange }
      />

      <span>Click to upload</span>
      <span>or drop here</span>

    </div>

  );

}


export default UploadField;
