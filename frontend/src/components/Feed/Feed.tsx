import { useContext, useEffect, useState } from 'react';

import styles from './Feed.module.css';

import { IUser } from '../../interfaces/user.interface';
import { IRecipePost } from '../../interfaces/recipePost.interface';

import { UserContext } from '../../contexts/user.context';

import * as userService from './../../services/user.service';

import spinner from './../../assets/icons/spinner.svg';
import recomm from './../../assets/icons/recomm.svg';

import Dropdown from '../Dropdown/Dropdown';
import CreateRecipeForm from '../CreateRecipeForm/CreateRecipeForm';
import RecipePost from '../RecipePost/RecipePost';
import Drawer from '../Drawer/Drawer';
import RecommBar from '../RecommBar/RecommBar';


const Feed = () => {
  
  const user = useContext<{ user: IUser | null, loading: boolean }>(UserContext).user;

  const [type, setType] = useState<string>('');


  const [unfollowed, setUnfollowed] = useState<string []>([]);


  const [feed, setFeed] = useState<IRecipePost [] | null>(null);

  useEffect(() => {

    const fetchFollowing = async () => {

      try {

        const data: IRecipePost [] = await userService.getFollowingFeed();

        setFeed(data);

      }
      catch (error: any) {

        console.log('Error while fetching feed: ' + (error as Error).message);

      }

    }
    const fetchDiscover = async () => {

      try {

        const data: IRecipePost [] = await userService.getDiscoverFeed();

        setFeed(data);

      }
      catch (error: any) {

        console.log('Error while fetching feed: ' + (error as Error).message);

      }

    }

    setFeed(null);
    
    const timeout = setTimeout(() => {
      
      setUnfollowed([]);
      type === 'Following' ? fetchFollowing() : fetchDiscover();

    }, 500);

    return () => clearTimeout(timeout);

  }, [type]);


  const handleUnfollow = (id?: string) => {

    setUnfollowed(prev => ([
      ...prev,
      id!
    ]));

  }


  return (

    <div className={ styles.container }>

      <div className={ styles.control }>

        <Dropdown
          items={ user ? ['Following', 'Discover'] : ['Discover']}
          value={ type }
          updateValue={ setType }
          extra='arrow'
          width='190px'
          height='50px'
          top='calc(100% + 10px)'
          disabled={ user ? false : true }
        />

        <div className={ styles.controlMore }>

          <Drawer title='Recommendations' minified={ true } buttonData={{
            icon: recomm,
            width: '50px',
            height: '50px',
          }}>
            <RecommBar />
          </Drawer>

          { user && (

            <CreateRecipeForm buttonData={{
              width: '50px',
              height: '50px'
            }} />

          )}
          
        </div>

      </div>

      <div className={ styles.content }>

        { !feed ? (

          <div className={ styles.loader }><img src={ spinner } /></div>

        ) : feed.length === 0 ? (

          <div className={ styles.loader }><span>Feed is empty</span></div>

        ) : feed.map((item: IRecipePost, index: number) => {

          if (type === 'Following') {

            if (unfollowed.includes(item.user._id!)) {

              return;

            }

          }

          return (

            <RecipePost key={ index } { ...item } handleUnfollow={ handleUnfollow } />

          );

        })}

      </div>

    </div>

  );

}


export default Feed;
