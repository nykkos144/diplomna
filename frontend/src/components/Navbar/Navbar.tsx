import { useContext, useEffect, useState } from 'react';
import { Link, Location, useLocation, useNavigate } from 'react-router-dom';

import styles from './Navbar.module.css';

import { IUser } from '../../interfaces/user.interface';

import { UserContext } from '../../contexts/user.context';

import CreateRecipeForm from '../CreateRecipeForm/CreateRecipeForm';

import feedStroke from './../../assets/icons/feed-stroke.svg';
import feedFilled from './../../assets/icons/feed-filled.svg';

import searchStroke from './../../assets/icons/search-stroke.svg';
import searchFilled from './../../assets/icons/search-filled.svg';

import notificationsStroke from './../../assets/icons/notifications-stroke.svg';
import notificationsFilled from './../../assets/icons/notifications-filled.svg';

import messagesStroke from './../../assets/icons/messages-stroke.svg';

import libraryStroke from './../../assets/icons/library-stroke.svg';
import libraryFilled from './../../assets/icons/library-filled.svg';

import settingsStroke from './../../assets/icons/settings-stroke.svg';
import settingsFilled from './../../assets/icons/settings-filled.svg';

import accountStroke from './../../assets/icons/account-stroke.svg';
import accountFilled from './../../assets/icons/account-filled.svg';

import reportStroke from './../../assets/icons/report-stroke.svg';
import reportFilled from './../../assets/icons/report-filled.svg';

import menu from './../../assets/icons/menu.svg';

import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import Ellipsis from '../Ellipsis/Ellipsis';


const Navbar = () => {

  const user = useContext<{ user: IUser | null, loading: boolean }>(UserContext).user;

  const location: Location = useLocation();
  const navigate = useNavigate();

  const [path, setPath] = useState<string>(location.pathname);

  useEffect(() => {

    setPath(location.pathname);

  }, [location.pathname]);
  

  const items = [

    // {
    //   id: 'home',
    //   title: 'Home',
    //   stroke: homeStroke,
    //   filled: homeFilled,
    //   pos: 'top'
    // },
    {
      id: 'feed',
      title: 'Feed',
      stroke: feedStroke,
      filled: feedFilled,
    },
    {
      id: 'search',
      title: 'Search',
      stroke: searchStroke,
      filled: searchFilled,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      stroke: notificationsStroke,
      filled: notificationsFilled,
    },
    // {
    //   id: 'messages',
    //   title: 'Messages',
    //   stroke: messagesStroke,
    //   filled: messagesFilled,
    // },
    {
      id: 'library',
      title: 'Library',
      stroke: libraryStroke,
      filled: libraryFilled,
    },

  ];

  const itemsNotLogged = [

    {
      id: 'feed',
      title: 'Feed',
      stroke: feedStroke,
      filled: feedFilled,
      pos: 'top'
    },
    {
      id: 'search',
      title: 'Search',
      stroke: searchStroke,
      filled: searchFilled,
      pos: 'top'
    }

  ];


  return (

    <>
    
      <div className={ styles.container }>

        <div className={ styles.content }>

          <div className={ `${ styles.top } ${ styles.itemContainer }` }>

            { ( user ? items : itemsNotLogged).map((item: any, index: number) => {

              const active: boolean = path === '/' + item.id;

              return (
                <Link key={ index } to={ '/' + item.id } className={ `${ styles.item } ${( active ? styles.active : '' )} ${ styles.resp }` }>
                  <img src={ !active ? item.stroke : item.filled } className={ styles.itemIcon } />
                  <span>{ item.title }</span>
                </Link>
              );
            })}

            { user?.admin && (

              <Link to={ '/reports' } className={ `${ styles.item } ${( path === '/reports' ? styles.active : '' )} ${ styles.resp }` }>
                <img src={ path !== '/reports' ? reportStroke : reportFilled } className={ styles.itemIcon } />
                <span>Reports</span>
              </Link>

            )}

          </div>

          <div className={ styles.compressed }>

            <Ellipsis
              icon={ menu }
              iconActive={ menu }
              title='Menu'
              items={!user?.admin ? [
                {
                  title: 'Feed',
                  icon: feedStroke,
                  handleClick: () => navigate('/feed')
                },
                {
                  title: 'Search',
                  icon: searchStroke,
                  handleClick: () => navigate('/search')
                },
                {
                  title: 'Notifications',
                  icon: notificationsStroke,
                  handleClick: () => navigate('/notifications')
                },
                {
                  title: 'Messages',
                  icon: messagesStroke,
                  handleClick: () => navigate('/messages')
                },
                {
                  title: 'Library',
                  icon: libraryStroke,
                  handleClick: () => navigate('/library')
                }
              ] : [
                {
                  title: 'Feed',
                  icon: feedStroke,
                  handleClick: () => navigate('/feed')
                },
                {
                  title: 'Search',
                  icon: searchStroke,
                  handleClick: () => navigate('/search')
                },
                {
                  title: 'Notifications',
                  icon: notificationsStroke,
                  handleClick: () => navigate('/notifications')
                },
                {
                  title: 'Messages',
                  icon: messagesStroke,
                  handleClick: () => navigate('/messages')
                },
                {
                  title: 'Library',
                  icon: libraryStroke,
                  handleClick: () => navigate('/library')
                },
                {
                  title: 'Reports',
                  icon: reportStroke,
                  handleClick: () => navigate('/reports')
                }
              ]}
              extra='arrow'
              height='40px'
              top='0px'
              left='calc(100% + 20px)'
              contentWidth='190px'
              minified={ true }
            />

          </div>

          { user && (

            <CreateRecipeForm buttonData={{
              width: '100%',
              height: '46px'
            }} />
          
          )}

          <div className={ `${ styles.bottom } ${ styles.itemContainer }` }>

            { user ? (

              <>
              
                <Link to={ '/settings' } className={ `${ styles.item } ${( path === '/settings' ? styles.active : '' )} ${ styles.resp }` }>
                  <img src={ path !== '/settings' ? settingsStroke : settingsFilled } className={ styles.itemIcon } />
                  <span>{ 'Settings' }</span>
                </Link>

                <Link to={ `/user/${ user.username }` } className={ `${ styles.item } ${( path === `/user/${ user.username }` ? styles.active : '' )} ${ styles.resp }` }>
                  <img src={ path !== `/user/${ user.username }` ? accountStroke : accountFilled } className={ styles.itemIcon } />
                  <span>{ 'Account' }</span>
                </Link>

              </>

            ) : (

              <>
              
                <SignInForm buttonData={{
                  content: 'Sign in',
                  width: '100%',
                  height: '46px',
                  minified: true
                }} />
                
                <SignUpForm buttonData={{
                  content: 'Sign up',
                  width: '100%',
                  height: '46px',
                  minified: true
                }} />
              
              </>

            )}

          </div>

        </div>

      </div>

      {/* <div className={ styles.mContainer }>

        <div className={ styles.mTop }>

          <div className={ styles.mTopContainer }>

            <div className={ styles.mTopLeft }>

              <Button
                type='secondary'
                handleClick={ () => navigate('/settings') }
                icon={ settingsStroke }
                width='40px'
                height='40px'
              />

            </div>

            <div className={ styles.mTopRight }>

              <Button
                type='secondary'
                handleClick={ () => navigate('/notifications') }
                icon={ notificationsStroke }
                width='40px'
                height='40px'
              />
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

        <div className={ styles.mBottom }>

          { (user ? items : itemsNotLogged).map((item: any, index: number) => {

            if (item.id === 'create') {

              return (

                <div key={ index } className={ styles.mItem }>

                    <CreateRecipeForm buttonData={{
                      width: '100%',
                      height: '100%'
                    }} full={ true } />

                </div>

              );

            }

            if (item.id === 'signin') {
              
              return (

                <div key={ index } className={ styles.mItem }>

                  <SignInForm buttonData={{
                    width: '100%',
                    height: '100%'
                  }} full={ true } />

                </div>

              );

            }

            if (item.id === 'signup') {

              return (

                <div key={ index } className={ styles.mItem }>

                  <SignUpForm buttonData={{
                    width: '100%',
                    height: '100%'
                  }} full={ true } />

                </div>

              );

            }

            return (

              <Link key={ index } to={ `/${ item.id }` } className={ `${ styles.mItem } ${ path === `/${ item.id }` ? styles.mctive : '' }` }>
              
                <img src={ path !== `/${ item.id }` ? item.icon : item.iconActive } className={ styles.mIcon } />
                <span className={ styles.mTitle }>{ item.title }</span>

              </Link>

            );

          })}

        </div>

      </div> */}

    </>

  );
  
}


export default Navbar;
