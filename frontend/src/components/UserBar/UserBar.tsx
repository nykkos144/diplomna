import { useContext, useEffect, useState } from 'react'; 

import styles from './UserBar.module.css';

import { IUser } from '../../interfaces/user.interface';

import { UserContext } from '../../contexts/user.context';

import * as reportService from './../../services/report.service';
import * as userService from './../../services/user.service';

import spinner from './../../assets/icons/spinner.svg';
import dots from './../../assets/icons/dots.svg';
import image from './../../assets/icons/image.svg';
import account from './../../assets/icons/account-stroke.svg';

import Button from '../Button/Button';
import Ellipsis from '../Ellipsis/Ellipsis';


const UserBar = ({
  
  user,
  followed,
  handleFollow,
  handleUnfollow

}: { user: IUser | null, followed: boolean, handleFollow: () => void, handleUnfollow: () => void }) => {

  const loggedUser: IUser | null = useContext<{ user: IUser | null, loading: boolean }>(UserContext).user;

  if (!user) {

    return (
      <div></div>
    );

  }

  const handleReport = async () => {

    await reportService.createReport('user', user._id!);

  }

  const handleLogOut = () => {

    localStorage.removeItem('Authorization');
    window.location.href = '/feed';

  }

  const handleDelete = async () => {

    if (!user) {
      return;
    }
    
    await userService.deleteUser(user._id!);

  }

  return (

    <div className={ styles.container }>

      { !user ? (

        <div className={ styles.loader }><img src={ spinner } /></div>

      ) : (

        <>
        
          <div className={ styles.top }>

            <div className={ styles.backdrop } style={{ backgroundImage: `url(${ user.backdrop })` }}>
              { !user.backdrop && <img src={ image } /> }
            </div>

            <div className={ styles.topBottom }>

              { loggedUser?._id !== user._id ? (

                <>
                
                  <Button
                    type={ followed ? 'secondary' : 'primary'}
                    handleClick={ followed ? handleUnfollow : handleFollow }
                    content={ followed ? 'Unfollow' : 'Follow' }
                    width='fit-content'
                    padding='0px 15px'
                    height='34px'
                    disabled={ !loggedUser ? true : false }
                  />

                  <Ellipsis
                    items={ !loggedUser?.admin ? [
                      {
                        title: 'Report',
                        handleClick: handleReport
                      }
                    ] : [
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
                      fontSize: '13px',
                      disabled: !loggedUser ? true : false
                    }}
                    top='calc(100% + 20px)'
                    right='0px'
                    itemHeight='40px'
                    contentWidth='140px'
                  />

                </>

              ) : (

                <>

                  <div className={ styles.you }>YOU</div>
                
                  <Ellipsis
                    items={[
                      {
                        title: 'Log out',
                        handleClick: handleLogOut
                      },
                      // {
                      //   title: 'Delete',
                      //   handleClick: handleDelete
                      // }
                    ]}
                    buttonData={{
                      type: 'secondary',
                      icon: dots,
                      width: '34px',
                      height: '34px',
                      iconSize: '4px',
                      fontSize: '13px',
                      disabled: !loggedUser ? true : false
                    }}
                    top='calc(100% + 20px)'
                    right='0px'
                    itemHeight='40px'
                    contentWidth='140px'
                  />

                </>

              )}


            </div>

            <div className={ styles.profilePicture } style={{ backgroundImage: `url(${ user.image })` }}>
              { !user.image && <img src={ account } /> }
            </div>

          </div>

          <div className={ styles.data }>

            <div>
              <span className={ styles.mainName }>{ user.fullName || `@${ user.username }` }</span>
              { user.fullName && <span className={ styles.secondaryName }>@{ user.username }</span> }
            </div>
            
            { user.bio && <p className={ styles.bio }>{ user.bio }</p> }

          </div>

          <div className={ styles.stats }>

            <div className={ styles.statItem }>

              <span>Followers</span>
              <span>{ user.followersCount }</span>

            </div>
            <div className={ styles.statItem }>

              <span>Following</span>
              <span>{ user.followingCount }</span>

            </div>
            <div className={ styles.statItem }>

              <span>Recipes</span>
              <span>{ user.recipeCount }</span>

            </div>
            <div className={ styles.statItem }>

              <span>Comments</span>
              <span>{ user.commentCount }</span>

            </div>

          </div>
        
        </>

      )}

    </div>

  );
  
}


export default UserBar;
