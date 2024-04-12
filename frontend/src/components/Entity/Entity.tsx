import { Link, useNavigate } from 'react-router-dom';

import styles from './Entity.module.css';

import { IUser } from '../../interfaces/user.interface';
import { IRecipePost } from '../../interfaces/recipePost.interface';

import arrRight from './../../assets/icons/arr-right.svg';
import account from './../../assets/icons/account-stroke.svg';

import Button from '../Button/Button';
import ProgressiveImage from 'react-progressive-graceful-image';


const Entity = ({

  type,
  content,
  imageSize

}: {

  type: 'user' | 'recipe';
  content: IUser | IRecipePost;
  imageSize?: string;

}) => {

  const navigate = useNavigate();

  const image = type === 'user' ? (content as IUser).image : (content as IRecipePost).recipe.pictures && (content as IRecipePost).recipe.pictures[0] || null;
  const mainContent = type === 'user' ? (content as IUser).fullName || `@${ (content as IUser).username }` : (content as IRecipePost).recipe.title;
  const secondaryContent = type === 'user' ? (content as IUser).recipeCount : (content as IRecipePost).user.fullName || `@${ (content as IRecipePost).user.username }`;

  const handleClick = () => {

    if (type === 'user') {

      navigate(`/user/${ (content as IUser).username }`);
      return;

    }
    
    navigate(`/recipe/${ (content as IRecipePost).recipe._id }`);

  }

  return (

    <div className={ styles.container }>

      { image ? (
        
        <ProgressiveImage src={ image! } placeholder="">
          {(src, loading, style) => (
            loading ? (
              <div className={ styles.image } style={{ width: imageSize, height: imageSize }}></div>
            ) : (
              <img src={ src } className={ styles.image } style={{ ...style,
                  backgroundColor: loading ? '#202020' : 'transparent' }}
              />
            )
          )}
        </ProgressiveImage>

      ) : (

        <div className={ styles.image } style={{ width: imageSize, height: imageSize }}>
          <img src={ account } />
        </div>
        
      )}


      <div className={ styles.content }>

        <span>{ mainContent }</span>

        <span>
          { type === 'user' ? (
            <>
              { (content as IUser).fullName ? `@${ (content as IUser).username } |` : '' } { secondaryContent } { Number(secondaryContent) === 1 ? 'recipe' : 'recipes' }
            </>
          ) : type === 'recipe' ? (
            <>
              by <Link to={ `/user/${ (content as IRecipePost).user.username }` }>{ secondaryContent }</Link>
            </>
          ) : '' }
        </span>

      </div>

      <Button
        type='secondary'
        handleClick={ handleClick }
        icon={ arrRight }
        iconSize='9px'
        width='34px'
        height='34px'
      />

    </div>

  );

}


export default Entity;

