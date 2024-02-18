import { useState } from 'react';

import styles from './Ellipsis.module.css';
import navbarStyles from './../Navbar/Navbar.module.css';

import { IEllipsis, IEllipsisItem } from '../../interfaces/ellipsis.interface';
import { IButton } from '../../interfaces/button.interface';

import arrRight from './../../assets/icons/arr-right.svg';
import Button from '../Button/Button';


const Ellipsis = ({

  items,
  icon,
  iconActive,
  title,
  extra,
  buttonData,
  ...stylingProps

}: IEllipsis & { buttonData?: Partial<IButton> }) => {

  const {
    
    width,
    height,

    top,
    bottom,
    left,
    right,

    itemHeight,
    fontSize,
    iconSize,

    minified,
    contentWidth

  } = stylingProps;

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {

    setOpen(prev => !prev);

  }

  
  return (

    <div className={ `${ styles.container } ${ open ? styles.open : '' }` }>

      <div className={ styles.cover } onClick={ handleOpen }></div>

      { buttonData ? (

        <Button type='secondary' handleClick={ handleOpen } { ...buttonData } />

      ) : (

        <button
          type='button'
          className={ `${ styles.button } ${ extra === 'arrow' ? styles.arrow : '' } ${ minified ? navbarStyles.resp : '' } ${ styles.disabled }` }
          style={{ width: width, height: height  }}
          onClick={ handleOpen }
        >

          { icon && <img src={ !open ? icon : iconActive || icon } className={ styles.buttonIcon } style={{ height: iconSize, width: 'auto' }} /> }
          { title && <span style={{ fontSize: fontSize }}>{ title }</span> }
          { extra && <img src={ arrRight } className={ styles.buttonArrow } /> }
          
        </button>
      
      )}


      
      <div className={ `${ styles.content }` } style={{ top: top, bottom: bottom, left: left, right: right, width: contentWidth }}>


        { items && items.map((item: IEllipsisItem, index: number) => {

          return (

            <div key={ index } className={ styles.item } style={{ height: itemHeight }} onClick={() => { handleOpen(); item.handleClick() }}>
              { item.icon && <img src={ item.icon } /> }
              <span style={{ fontSize: fontSize }}>{ item.title }</span>
            </div>

          );

        })}

      </div>
      
    </div>

  );

}


export default Ellipsis;
