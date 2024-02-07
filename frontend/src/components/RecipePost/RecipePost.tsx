import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './RecipePost.module.css';

import { IRecipePost } from '../../interfaces/recipePost.interface';
import { IUser } from '../../interfaces/user.interface';

import { UserContext } from '../../contexts/user.context';

import { getTimeElapsed } from '../../utils/time.util';

import * as userService from './../../services/user.service';
import * as followService from './../../services/follow.service';
import * as reportService from './../../services/report.service';
import * as recipeService from './../../services/recipe.service';

import dots from './../../assets/icons/dots.svg';

import libraryStroke from './../../assets/icons/library-stroke.svg';
import libraryFilled from './../../assets/icons/library-filled.svg';

import RatingButton from '../RatingButton/RatingButton';
import Ellipsis from '../Ellipsis/Ellipsis';
import Entity from '../Entity/Entity';
import Button from '../Button/Button';
import CreateCommentForm from '../CreateCommentForm/CreateCommentForm';
import ScrollContainer from 'react-indiana-drag-scroll';


const RecipePost = ({ recipe, user, followedOut, handleFollow, handleUnfollow }: IRecipePost & { followedOut?: boolean, handleFollow?: (id?: string) => void, handleUnfollow?: (id?: string) => void }) => {

  const loggedUser = useContext<{ user: IUser | null, loading: boolean }>(UserContext).user;
  const navigate = useNavigate();

  const [saved, setSaved] = useState<boolean>(loggedUser && loggedUser.saved?.includes(recipe._id!) ? true : false);
  const [followed, setFollowed] = useState<boolean>(followedOut ? followedOut : user.followed || false);


  useEffect(() => {

    setSaved(loggedUser && loggedUser.saved?.includes(recipe._id!) ? true : false);
    setFollowed(followedOut ? followedOut : user.followed || false);

  }, [recipe, user, followedOut]);


  const tags = [...recipe.dietPref, ...recipe.mealType, ...recipe.cuisineType];


  const handleFollowClick = async (followingId: string) => {

    await followService.createFollow(followingId);

    setTimeout(() => {
      setFollowed(true);
    }, 200);

    handleFollow && handleFollow(user._id!);

  }

  const handleUnfollowClick = async (followingId: string) => {

    await followService.deleteFollow(followingId);

    setTimeout(() => {
      setFollowed(false);
    }, 200);

    handleUnfollow && handleUnfollow(user._id!);

  }


  const handleSaveClick = async () => {

    await userService.saveRecipe(recipe._id!);
    
    setSaved(true);

  }

  const handleUnsaveClick = async () => {

    await userService.unsaveRecipe(recipe._id!);

    setSaved(false);

  }


  const handleReport = async () => {

    await reportService.createReport('recipe', recipe._id!);

  }


  const handleViewClick = () => {
    
    navigate(`/recipe/${ recipe._id! }`);

  }


  const handleDelete = async () => {

    await recipeService.deleteRecipe(recipe._id!);

  }


  return (

    <div className={ styles.container }>

      <div className={ styles.top }>

        <div className={ styles.topLeft }>
        
          <RatingButton
            recipeId={ recipe._id! }
            rating={ recipe.rating || 0 }
            currentRating={ recipe.currentRating! }
            ratingCount={ recipe.ratingCount! }
            disabled={ !loggedUser || loggedUser._id === user._id ? true : false }
          />
          
          <div className={ styles.difficulty }>
            <span style={{ color: recipe.difficulty === 'Easy' ? '#2ECC71' : recipe.difficulty === 'Medium' ? '#FE6730' : '#FF0000' }}>{ recipe.difficulty }</span>
          </div>

        </div>

        <div className={ styles.topRight }>

          <span className={ styles.time }>{ getTimeElapsed(new Date(recipe.createdAt!)) }</span>

          <Ellipsis
            items={ !loggedUser?.admin ? [
              {
                title: followed ? 'Unfollow' : 'Follow',
                handleClick: () => followed ? handleUnfollowClick(user._id!) : handleFollowClick(user._id!)
              },
              {
                title: 'Report',
                handleClick: handleReport
              }
            ] : [
              {
                title: followed ? 'Unfollow' : 'Follow',
                handleClick: () => followed ? handleUnfollowClick(user._id!) : handleFollowClick(user._id!)
              },
              {
                title: 'Report',
                handleClick: handleReport
              },
              {
                title: 'Delete',
                handleClick: handleDelete
              }
            ]}
            buttonData={{
              type: 'secondary',
              icon: dots,
              width: '34px',
              height: '34px',
              iconSize: '4px',
              disabled: !loggedUser || loggedUser._id === user._id ? true : false
            }}
            top='calc(100% + 20px)'
            right='0px'
            itemHeight='40px'
            contentWidth='120px'
          />

        </div>

      </div>

      <div className={ styles.content }>

        <div className={ styles.image } style={{ backgroundImage: `url(${ recipe.pictures[0] })` }}></div>
        {/* <img src={ recipe.pictures[0] } className={ styles.image } /> */}
        
        <div className={ styles.details }>

          <span>{ recipe.title }</span>
          <p>{ recipe.description }</p>

        </div>
          
        <div className={ styles.entity }>
          <Entity type='user' content={ user } />
        </div>

      </div>

      <div className={ styles.bottom }>

        <div className={ styles.bottomLeft }>

          { tags.slice(0, 2).map((tag: string, index: number) => {

            return (
              <div key={ index } className={ styles.tag }>
                <span>{ tag }</span>
              </div>
            );

          })}

          { tags.length - 2 > 0 && (

            <div className={ styles.tag }>
              <span>+{ tags.length - 2 }</span>
            </div>

          )}

        </div>

        <div className={ styles.bottomRight }>

          {/* { recipe.commentCount }
          { saved ? ' | saved | ' : ' | not saved |' }
          { followed ? ' | followed | ' : ' | not followed |' } */}

          <CreateCommentForm
            submitData={{
              recipeId: recipe._id as string
            }}
            buttonData={{
              content: recipe.commentCount?.toString(),
              height: '34px',
              iconSize: '14px',
              fontSize: '12px',
              gap: '15px',
              padding: '0px 20px 0px 15px',
              disabled: !loggedUser ? true : false
            }}
          />
          
          { loggedUser && (
            
            <Button
              type='secondary'
              handleClick={ !saved ? handleSaveClick : handleUnsaveClick  }
              icon={ saved ? libraryFilled : libraryStroke }
              iconSize='14px'
              width='34px'
              height='34px'
              // disabled={ !loggedUser ? true : false }
            />

          )}

          <Button
            type='primary'
            handleClick={ handleViewClick }
            content='View'
            width='60px'
            height='34px'
            // padding='0px 10px 0px 10px'
          />

        </div>

      </div>
      
      <div className={ styles.bottomCompressed }>

        { (tags && tags.length > 0) && (

          <ScrollContainer className={ styles.tagsContainer } vertical={ false }>

            <div className={ styles.tags }>

              { tags.map((item: string, index: number) => {

                return (
                  <div key={ index } className={ styles.tag }>
                    <span>{ item }</span>
                  </div>
                )

              })}

            </div>

          </ScrollContainer>
        
        ) }

        <div className={ styles.bottomBottom }>

          <div className={ styles.bottomLeft }>

            <CreateCommentForm
              submitData={{
                recipeId: recipe._id as string
              }}
              buttonData={{
                content: recipe.commentCount?.toString(),
                height: '34px',
                iconSize: '14px',
                fontSize: '12px',
                gap: '15px',
                padding: '0px 20px 0px 15px',
                disabled: !loggedUser ? true : false
              }}
            />

          </div>

          <div className={ styles.bottomRight }>

            { loggedUser && (
              
              <Button
                type='secondary'
                handleClick={ !saved ? handleSaveClick : handleUnsaveClick  }
                icon={ saved ? libraryFilled : libraryStroke }
                iconSize='14px'
                width='34px'
                height='34px'
                // disabled={ !loggedUser ? true : false }
              />

            )}

            <Button
              type='primary'
              handleClick={ handleViewClick }
              content='View'
              width='60px'
              height='34px'
              // padding='0px 10px 0px 10px'
            />

          </div>

        </div>

      </div>

    </div>

  )

}


export default RecipePost;
