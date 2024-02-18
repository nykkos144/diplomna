import { useState } from 'react';
import styles from './AddBlock.module.css';

import { IInput } from './../../interfaces/input.interface';
import { IDropdown } from './../../interfaces/dropdown.interface';
import { IAdd, IAddItem } from './../../interfaces/add.interface';
import { IFormData } from './../../interfaces/formData.interface';

import plus from './../../assets/icons/plus.svg';
import closeX from './../../assets/icons/close-x.svg';

import Input from './../Input/Input';
import Button from './../Button/Button';
import Dropdown from './../Dropdown/Dropdown';


const AddBlock = ({

  items,
  type,
  value,
  addValue,
  removeValue,
  ...stylingProps

}: IAdd & { value: [], addValue: (value: IFormData) => void, removeValue: (type: 'value' | 'index', value: string | number) => void }) => {

  const {

    width,
    height,

  } = stylingProps;


  const [values, setValues] = useState<any>(
    items.reduce((acc, item: IAddItem) => ({ ...acc, [item.data.id as string]: '' }), {})
  );

  const changeValue = (id: string, value: string) => {

    setValues((prev: any) => ({ ...prev, [id]: value }));

  }

  const handleAdd = () => {

    const notEmpty = Object.values(values).every(value => value !== '');

    if (!notEmpty) {
      return;
    }

    addValue(values);

    setValues((prev: any) => {

      const updatedValues = { ...prev };
    
      items
        .filter(item => item.type === 'input')
        .forEach(item => {
          updatedValues[item.data.id as string] = '';
        });
        
      return updatedValues;

    });

  }

  const handleRemove = (index: number) => {

    removeValue('index', index);

  }

  return (

    <div className={ styles.container }>
    
      <div className={ styles.content } style={{ width: width, height: height }}>

        { items.map((item: IAddItem, index: number) => {

          if (item.type === 'input') {

            return (
    
              <Input
                key={ index }
                { ...item.data as IInput }
                value={ values ? values[item.data.id as string] : '' }
                updateValue={(value: string) => changeValue(item.data.id as string, value)}
              />
    
            );

          }
          else if ( item.type === 'dropdown') {

            return (

              <Dropdown
                key={ index }
                { ...item.data as IDropdown }
                value={ values ? values[item.data.id as string] : '' }
                updateValue={(value: string) => changeValue(item.data.id as string, value)}
              />

            )

          }


        })}

        <Button
          type='primary'
          handleClick={ handleAdd }
          icon={ plus }
          iconSize='14px'
          width='50px'
          height='50px'
        />

      </div>
    
      { value && value.length > 0 && (

        <div className={ `${ styles.valueContainer } ${ (type === 'ingredients' ? styles.multiple : styles.single) }` }>

          { (value as any []).map((add: any, index: number) => {

            return (

              <div key={ index } className={ styles.value } onClick={() => handleRemove(index)}>

                { type === 'ingredients' ? (
                    <span>{ add.ingredient.charAt(0).toUpperCase() + add.ingredient.slice(1) } { add.quantity }{ add.metric }</span>
      
                ) : type === 'steps' ? (

                    <span>{ index + 1 }. { add.step.charAt(0).toUpperCase() + add.step.slice(1) }</span>
                
                ) : (
                  <span>{ add.ingredient.charAt(0).toUpperCase() + add.ingredient.slice(1) }</span>
                ) }

                <div></div>
                <img src={ closeX } />

              </div>
            
            );

          })}

        </div>

      )}

    </div>

  );

}


export default AddBlock;
