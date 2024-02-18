import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './UserPage.module.css';

import { IUser } from '../../interfaces/user.interface';

import * as userService from './../../services/user.service';
import * as followService from './../../services/follow.service';

import UserBar from '../../components/UserBar/UserBar';
import { IRecipePost } from '../../interfaces/recipePost.interface';
import User from '../../components/User/User';
import { ICommentPost } from '../../interfaces/commentPost.interface';
import NotFound from '../../components/NotFound/NotFound';


const UserPage = () => {

  const { username } = useParams();
  
  const [user, setUser] = useState<IUser | null>(null);
  const [recipes, setRecipes] = useState<IRecipePost [] | null>(null);
  const [comments, setComments] = useState<ICommentPost [] | null>(null);

  const [followed, setFollowed] = useState<boolean>( user?.followed || false );

  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {

    if (!username) {

      return;

    }

    const fetchUser = async () => {

      try {

        const data: IUser = await userService.getUser(username);

        if (!data) {

          setNotFound(true);
          return;

        }

        setUser(data);
        setFollowed(data.followed || false);

      }
      catch (error) {

        setNotFound(true);
        console.log('User not found');

      }

    }
    const fetchRecipes = async () => {

      try {

        const data: IRecipePost [] = await userService.getUserRecipes(username);

        setRecipes(data);

      }
      catch (error) {

        console.log('User not found')

      }

    }
    const fetchComments = async () => {

      try {

        const data: ICommentPost [] = await userService.getUserComments(username);

        setComments(data);

      }
      catch (error) {

        console.log('User not found')

      }

    }

    fetchUser();
    fetchRecipes();
    fetchComments();

  }, [username]);


  const handleFollowClick = async () => {

    if (!user) {
      return;
    }

    await followService.createFollow(user._id!);

    setFollowed(true);

  }

  const handleUnfollowClick = async () => {

    if (!user) {
      return;
    }

    await followService.deleteFollow(user._id!);

    setFollowed(false);

  }


  return (

    <>

      { notFound ? (

        <NotFound />

      ) : (

        <>
      
          <div className={ styles.content }>
            <div className={ styles.secondary }>
              <UserBar user={ user } followed={ followed } handleFollow={ handleFollowClick } handleUnfollow={ handleUnfollowClick } />
            </div>
            <User recipes={ recipes } comments={ comments } followed={ followed } handleFollow={ handleFollowClick } handleUnfollow={ handleUnfollowClick } />
          </div>


          <div className={ styles.fixedContainer }>

            <div className={ styles.fixed }>

              <UserBar user={ user } followed={ followed } handleFollow={ handleFollowClick } handleUnfollow={ handleUnfollowClick } />

            </div>

          </div>

        </>
      
      )}



    </>

  );

}


export default UserPage;
