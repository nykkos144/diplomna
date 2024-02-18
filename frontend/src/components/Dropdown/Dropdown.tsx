import { useEffect, useState } from 'react';

import styles from './Dropdown.module.css';

import { IDropdown } from '../../interfaces/dropdown.interface';

import arrDown from './../../assets/icons/arr-down.svg';


const Dropdown = ({

  items,
  extra,
  value,
  updateValue,
  disabled,
  ...stylingProps

}: IDropdown & { value: string, updateValue: (value: string) => void }) => {

  const {
    
    width,
    height,

    top,
    bottom,
    left,
    right,

    contentWidth,
    itemHeight,
    fontSize,

    padding

  } = stylingProps;


  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {

    if (disabled) {
      return;
    }

    setOpen(prev => !prev);

  }


  useEffect(() => {
  
    if (value !== '') {
      return;
    }

    updateValue(items[0]);
  
  }, [value]);

  const handleClick = (index: number) => {

    handleOpen();

    setTimeout(() => {
      updateValue(items[index]);
    }, 100);

  }
  

  return (

    <div className={ `${ styles.container } ${ open ? styles.open : '' }` }>

      <div className={ styles.cover } onClick={ handleOpen }></div>

      <button
        type='button'
        className={ `${ styles.button } ${ extra === 'arrow' ? styles.arrow : '' } ${ disabled ? styles.disabled : '' }` }
        style={{ width: width, height: height, padding: padding }}
        onClick={ handleOpen }
      >
        <span style={{ fontSize: fontSize }}>{ value }</span>
        { extra && <img src={ arrDown }/> }
        
      </button>

      
      <div className={ `${ styles.content }` } style={{ top: top, bottom: bottom, left: left, right: right, width: contentWidth }}>

        { items && items.map((item: string, index: number) => {
          
          if (item === value) {
            return;
          }

          return (

            <div key={ index } className={ styles.item } style={{ height: itemHeight }} onClick={() => handleClick(index)}>
              <span style={{ fontSize: fontSize }}>{ item }</span>
            </div>

          );

        })}

      </div>
      
    </div>

  );

}


export default Dropdown;
