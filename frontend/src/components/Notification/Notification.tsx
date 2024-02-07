import { INotificationPost } from '../../interfaces/notificationPost.interface';
import styles from './Notification.module.css';


import account from './../../assets/icons/account-stroke.svg';
import message from './../../assets/icons/messages-stroke.svg';
import comment from './../../assets/icons/comment-stroke.svg';
import rating from './../../assets/icons/star-stroke.svg';
import notif from './../../assets/icons/notifications-stroke.svg';
import { Link } from 'react-router-dom';
import { getTimeElapsed } from '../../utils/time.util';
import Button from '../Button/Button';


const Notification = ({ user, notification, recipe, handleSeen }: INotificationPost & { handleSeen: () => void }) => {

  const typeIcon = notification.type === 'follow' ? account :
  notification.type === 'message' ? message :
  notification.type === 'comment' ? comment :
  notification.type === 'rating' ? rating : notif

  const secondary = notification.type === 'follow' ? '' :
  notification.type === 'message' ? '💬: ' + notification.content :
  notification.type === 'comment' ? '💬: ' + notification.content :
  notification.type === 'rating' ? '⭐: ' + notification.content : ''


  return (

    <div className={ `${ styles.container } ${ notification.seen ? styles.seen : ''  }` }>

      <div className={ styles.top }>

        <div className={ styles.type }><img src={ typeIcon } /></div>

        <p className={ styles.main }>
          
          { notification.type === 'follow' ? (
            
            <>
              <Link to={ `/user/${ user.username }` }>{ user.fullName || `@${ user.username }` }</Link> followed you
            </>

          ) : notification.type === 'message' ? (

            <>
              <Link to={ `/user/${ user.username }` }>{ user.fullName || `@${ user.username }` }</Link> messaged you            
            </>

          ) : notification.type === 'comment' ? (

            <>
              <Link to={ `/user/${ user.username }` }>{ user.fullName || `@${ user.username }` }</Link> commented on <Link to={ `/recipe/${ recipe?._id }` }>{ recipe?.title }</Link>      
            </>

          ) : notification.type === 'rating' ? (

            <>
              <Link to={ `/user/${ user.username }` }>{ user.fullName || `@${ user.username }` }</Link> rated <Link to={ `/recipe/${ recipe?._id }` }>{ recipe?.title }</Link>      
            </>

          ) : '' }

        </p>

        { secondary && (

          <p className={ styles.secondary }>{ secondary }</p>
        
        )}

      </div>

      <div className={ styles.bottom }>
        
        <span className={ styles.time }>{ getTimeElapsed(new Date(notification.createdAt!)) }</span>

        <Button
          type={ !notification.seen ? 'primary' : 'secondary' }
          handleClick={ handleSeen }
          content={ !notification.seen ? 'Mark as seen' : 'Mark as unseen' }
          width='fit-content'
          height='34px'
          padding='0px 15px'    
        />

      </div>

    </div>

  )

}


export default Notification;
