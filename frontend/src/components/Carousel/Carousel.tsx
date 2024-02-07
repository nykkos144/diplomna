import { useState } from 'react';
import styles from './Carousel.module.css';

import arrLeft from './../../assets/icons/arr-left.svg';
import arrRight from './../../assets/icons/arr-right.svg';

import Button from '../Button/Button';
import ProgressiveImage from 'react-progressive-graceful-image';


const Carousel = ({ images }: { images: string [] }) => {

  const [current, setCurrent] = useState(0);

  const handleBack = () => {

    setCurrent(prev => prev - 1);

  }

  const handleNext = () => {

    setCurrent(prev => prev + 1);

  }


  return (

    <div className={ styles.container }>

      <Button
        type='secondary'
        handleClick={ handleBack }
        icon={ arrLeft }
        width='40px'
        disabled={ current === 0 }
      />

      <div className={ styles.content }>

        <div className={ styles.items } style={{ width: `${ images.length * 100 }%`, marginLeft: `-${ current * 100 }%` }}>

          { images.map((image: string, index: number) => {

            return (
              <div key={ index } className={ styles.item } style={{ backgroundImage: `url(${ image })` }}></div>
            );

            // return (

            //   <ProgressiveImage src={ image } placeholder="" key={ index }>
            //     {(src, loading, style) => (
                  
            //       loading ? (
      
            //         <div className={ styles.item }></div>
      
            //       ) : (
      
            //         <img
            //           src={ src }
            //           className={ styles.item }
            //           style={{
            //             ...style,
            //             backgroundColor: loading ? '#202020' : 'transparent',
            //           }}
            //         />
                    
            //       )
      
            //     )}
            //   </ProgressiveImage>
            
            // );

          })}

        </div>

      </div>

      <Button
        type='secondary'
        handleClick={ handleNext }
        icon={ arrRight }
        width='40px'
        disabled={ current === images.length - 1 }
      />

    </div>
    
  );

}


export default Carousel;
