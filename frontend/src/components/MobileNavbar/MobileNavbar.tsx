import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, Location, useNavigate } from 'react-router-dom';

import styles from './MobileNavbar.module.css';

import { IUser } from '../../interfaces/user.interface';

import { UserContext } from '../../contexts/user.context';

import feedStroke from './../../assets/icons/feed-stroke.svg';
import feedFilled from './../../assets/icons/feed-filled.svg';

import searchStroke from './../../assets/icons/search-stroke.svg';
import searchFilled from './../../assets/icons/search-filled.svg';

import notificationsStroke from './../../assets/icons/notifications-stroke.svg';
import notificationsFilled from './../../assets/icons/notifications-filled.svg';

import libraryStroke from './../../assets/icons/library-stroke.svg';

import settingsStroke from './../../assets/icons/settings-stroke.svg';

import accountStroke from './../../assets/icons/account-stroke.svg';
import accountFilled from './../../assets/icons/account-filled.svg';

import report from './../../assets/icons/report-stroke.svg';


import CreateRecipeForm from '../CreateRecipeForm/CreateRecipeForm';
import Button from '../Button/Button';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';



const MobileNavbar = () => {

  const user = useContext<{ user: IUser | null, loading: boolean }>(UserContext).user;

  const location: Location = useLocation();
  const navigate = useNavigate();

  const [path, setPath] = useState<string>(location.pathname);

  useEffect(() => {

    setPath(location.pathname);

  }, [location.pathname]);


  const items: any = [
    {
      id: 'feed',
      title: 'Feed',
      icon: feedStroke,
      iconActive: feedFilled,
    },
    {
      id: 'search',
      title: 'Search',
      icon: searchStroke,
      iconActive: searchFilled,
    },
    {
      id: 'create',
      title: 'Create',
      icon: feedStroke,
      iconActive: feedFilled,
    },
    // {
    //   id: 'messages',
    //   title: 'Messages',
    //   icon: messagesStroke,
    //   iconActive: messagesFilled,
    // },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: notificationsStroke,
      iconActive: notificationsFilled,
    },
    {
      id: `user/${ user?.username }`,
      title: 'Account',
      icon: accountStroke,
      iconActive: accountFilled,
    }
  ];

  const itemsNotLogged: any = [
    {
      id: 'feed',
      title: 'Feed',
      icon: feedStroke,
      iconActive: feedFilled,
    },
    {
      id: 'search',
      title: 'Search',
      icon: searchStroke,
      iconActive: searchFilled,
    },
    {
      id: 'signin'
    },
    {
      id: 'signup'
    }
  ];

  return (

    <div className={ styles.container }>

      { user && (

        <div className={ styles.top }>

          <div className={ styles.topContainer }>

            <div className={ styles.topLeft }>

              <Button
                type='secondary'
                handleClick={ () => navigate('/settings') }
                icon={ settingsStroke }
                width='40px'
                height='40px'
              />

              {/* { user?.admin && (

                <Button
                  type='secondary'
                  handleClick={ () => navigate('/reports') }
                  icon={ report }
                  width='40px'
                  height='40px'
                />

              )} */}

            </div>

            <div className={ styles.topRight }>

              {/* <Button
                type='secondary'
                handleClick={ () => navigate('/notifications') }
                icon={ notificationsStroke }
                width='40px'
                height='40px'
              /> */}

              { user?.admin && (

                <Button
                  type='secondary'
                  handleClick={ () => navigate('/reports') }
                  icon={ report }
                  width='40px'
                  height='40px'
                />

              )}

              <Button
                type='secondary'
                handleClick={ () => navigate('/library') }
                icon={ libraryStroke }
                width='40px'
                height='40px'
              />

            </div>

          </div>

        </div>
        
      )}
      

      <div className={ styles.bottom }>

        <div className={ styles.bottomContainer }>

          { (user ? items : itemsNotLogged).map((item: any, index: number) => {

            if (item.id === 'create') {

              return (

                <div key={ index } className={ styles.item }>

                    <CreateRecipeForm buttonData={{
                      width: '100%',
                      height: '100%'
                    }} full={ true } />

                </div>

              );

            }

            if (item.id === 'signin') {
              
              return (

                <div key={ index } className={ styles.item }>

                  <SignInForm buttonData={{
                    width: '100%',
                    height: '100%'
                  }} full={ true } />

                </div>

              );

            }

            if (item.id === 'signup') {

              return (

                <div key={ index } className={ styles.item }>

                  <SignUpForm buttonData={{
                    width: '100%',
                    height: '100%'
                  }} full={ true } />

                </div>

              );

            }

            return (

              <Link key={ index } to={ `/${ item.id }` } className={ `${ styles.item } ${ path === `/${ item.id }` ? styles.active : '' }` }>
              
                <img src={ path !== `/${ item.id }` ? item.icon : item.iconActive } className={ styles.icon } />
                {/* <span className={ styles.title }>{ item.title }</span> */}

              </Link>

            );

          })}

        </div>

      </div>

    </div>
  
  );

}


export default MobileNavbar;
