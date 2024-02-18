import { useEffect, useState } from 'react';

import styles from './RatingButton.module.css';

import * as ratingService from './../../services/rating.service';

import starStroke from './../../assets/icons/star-stroke.svg';
import starFilled from './../../assets/icons/star-filled.svg';


const RatingButton = ({

  recipeId,
  rating,
  currentRating,
  ratingCount,
  disabled

}: { recipeId: string, rating: number, currentRating: number, ratingCount: number, disabled: boolean }) => {

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {

    setOpen(prev => !prev);

  }

  const [mainRating, setMainRating] = useState<number>(rating);
  const [count, setCount] = useState<number>(ratingCount);
  // let count = ratingCount;
  const [curr, setCurr] = useState<number>(currentRating);

  useEffect(() => {

    setMainRating(rating);
    setCount(ratingCount);
    setCurr(currentRating);

  }, [rating, currentRating, ratingCount]);

  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = async (rating: number) => {

    if (rating === curr) {

      return;

    }

    if (curr) {
      
      setMainRating(prev => ((prev * count) - curr + rating) / count);
      
      await ratingService.updateRating(recipeId, rating);
    
    }
    else {

      // setMainRating(prev => ((prev * count) + rating) / (count + 1));

      setMainRating(prev => {
        // count += 1;
        return ((prev * count) + rating) / (count + 1)
      });

      setCount(prev => prev + 1);
      // count++;

      await ratingService.createRating(recipeId, rating);
    
    }

    setCurr(rating);

    handleOpen();

  }


  return (

    <div className={ `${ styles.container } ${ open ? styles.open : '' }` }>

      <div className={ styles.cover } onClick={ handleOpen }></div>

      <button type='button' className={ `${ styles.button } ${ disabled ? styles.disabled : '' }` } disabled={ disabled } onClick={ handleOpen }>

        { mainRating === 0 ? (

          <img src={ starStroke } />

        ) : Array.from({ length: Math.round(mainRating) }).map((_, index: number) => {

          return (
            
            <img key={ index } src={ starFilled } />

          );

        })}

      </button>

      <div className={ styles.content }>

        <div className={ styles.stars }>

          { Array.from({ length: 5 }).map((_, index: number) => {

            return (
              
              <div
                key={ index }
                className={ `${ styles.star } ${ hovered !== null && (index > hovered && hovered < curr - 1 && index < curr) ? styles.trans : '' }` }
                onClick={() => handleClick(index + 1)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                
              >

                <img src={ (hovered !== null && hovered >= index) || index < curr ? starFilled : starStroke } />
                
              </div>

            );

          })}

        </div>

      </div>

    </div>


  );

}


export default RatingButton;
