import styles from './Input.module.css';

import { IInput } from '../../interfaces/input.interface';

import { ChangeEvent } from 'react';


const Input = ({
  
  title,
  type,
  limit,
  
  value,
  updateValue,
  ...stylingProps

}: IInput & { value: string, updateValue: (value: string) => void }) => {

  const {

    width,
    height,
    fontSize,

  } = stylingProps;

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {

    updateValue(event.target.value);

  }

  return (

    <input
      className={ styles.input }
      type={ type }
      placeholder={ title }
      style={{ width: width, minWidth: width, height: height, minHeight: height, fontSize: fontSize }}
      maxLength={ limit }
      value={ value }
      onChange={ handleValueChange }
    />
    
  );

}


export default Input;
