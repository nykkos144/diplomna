import { IButton } from '../../interfaces/button.interface';

import styles from './Button.module.css';
import navbarStyles from './../Navbar/Navbar.module.css';
import ellipsisStyles from './../Ellipsis/Ellipsis.module.css';


const Button = ({
  
  type,
  icon,
  content,
  secondaryContent,
  secondaryContentActive,
  handleClick,
  disabled,
  ...stylingProps

}: IButton & { handleClick: () => void }) => {

  const {
    
    width,
    height,

    fontSize,
    iconSize,
    iconRotate,

    minified,

    gap,
    padding

  } = stylingProps;

  
  return (

    <button
      className={ `${ styles.button } ${ styles[type] } ${( secondaryContent ? styles.secondaryContent : '' )} ${( secondaryContentActive ? styles.secondaryContentActive : '' )} ${ disabled ? styles.disabled : '' } ${ minified ? navbarStyles.buttonResp : '' } ${ ellipsisStyles.buttonComponent }` }
      style={{ width: width, minWidth: width, height: height, minHeight: height, gap: gap, padding: padding, paddingRight: padding?.split(' ')[1] }}
      onClick={ handleClick }
      disabled={ disabled }
    >

      { icon && (
        <img src={ icon } style={{ height: iconSize || 'auto', rotate: iconRotate }} />
      )}

      { content && (
        <div className={ styles.content }>

          <span style={{ fontSize: fontSize }}>{ content }</span>
          { secondaryContent && <span style={{ fontSize: fontSize }}>{ secondaryContent }</span> }

        </div>
      )}

    </button>

  );

}


export default Button;
