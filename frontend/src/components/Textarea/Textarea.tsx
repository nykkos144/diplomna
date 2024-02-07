import { ChangeEvent, createRef } from 'react';
import { ITextarea } from '../../interfaces/textarea.interface';
import styles from './Textarea.module.css';


const Textarea = ({
  
  title,
  limit,
  
  value,
  updateValue,
  ...stylingProps

}: ITextarea & { value: string, updateValue: (value: string) => void }) => {

  const {

    width,
    height,
    fontSize,

  } = stylingProps;


  const handleValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {

    updateValue(event.target.value);
    updateTextareaHeight();

  }

  const textareaRef = createRef<HTMLTextAreaElement>();

  const updateTextareaHeight = () => {

    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }

  };

  return (

    <textarea
      ref={ textareaRef }
      className={ styles.textarea }
      placeholder={ title }
      style={{ width: width, minWidth: width, height: height, minHeight: height, fontSize: fontSize }}
      maxLength={ limit }
      value={ value }
      onChange={ handleValueChange }
    />
    
  );

}


export default Textarea;
