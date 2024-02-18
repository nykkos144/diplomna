import { ReactNode, useState } from 'react';

import styles from './Drawer.module.css';
import appStyles from './../../App.module.css';

import { IButton } from '../../interfaces/button.interface';
import { IStyling } from '../../interfaces/styling.interface';

import close from './../../assets/icons/close-x.svg';

import Button from '../Button/Button';


const Drawer = ({

  children,
  title,
  minified,
  buttonData,
  ...stylingProps

}: { children: ReactNode, title: string, minified?: boolean, buttonData?: Partial<IButton> } & IStyling) => {

  const {
    
    width,
    height,

  } = stylingProps;

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {

    setOpen(prev => !prev);

  }

  
  return (

    <div className={ `${ styles.container } ${ open ? styles.open : '' } ${ minified ? appStyles.minifiedDrawer : '' }` }>

      <div className={ styles.cover } onClick={ handleOpen }></div>

      <Button type='secondary' handleClick={ handleOpen } { ...buttonData } />

      <div className={ styles.contentContainer }>
        
        <div className={ `${ styles.content }` } style={{ width: width, height: height }}>

          <div className={ styles.control }>

            <span>{ title }</span>

            <Button
              type='secondary'
              icon={ close }
              handleClick={ handleOpen }
              width='34px'
              height='34px'
            />

          </div>

          { children }

        </div>
        
      </div>
      
    </div>

  );

}


export default Drawer;
