import { useEffect, useState } from 'react';
import styles from './Notifications.module.css';

import spinner from './../../assets/icons/spinner.svg';
import seen from './../../assets/icons/seen.svg';

import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/Button';
import Notification from '../Notification/Notification';

import { INotificationPost } from '../../interfaces/notificationPost.interface';

import * as userService from './../../services/user.service';
import * as notificationService from './../../services/notification.service';


const Notifications = () => {

  const [type, setType] = useState<string>('');
  const [notifications, setNotifications] = useState<INotificationPost [] | null>(null);


  useEffect(() => {

    const fetchNotifications = async () => {

      const data: INotificationPost [] = await userService.getNotifications();

      setNotifications(data);

    }

    fetchNotifications();

  }, []);


  const filter = (notifs: INotificationPost []): INotificationPost [] => {

    if (!notifs) {

      return [];

    }

    return notifs.filter((notif: INotificationPost) => {

      switch (type) {
      
        case 'All':
          return true;
    
        case 'Follows':
          return notif.notification.type === 'follow';
    
        case 'Messages':
          return notif.notification.type === 'message';
    
        case 'Comments':
          return notif.notification.type === 'comment';
    
        case 'Ratings':
          return notif.notification.type === 'rating';
    
        default:
          return false;

      }

    });

  }


  const handleSeenAll = async () => {

    if (!notifications) {

      return;

    }

    const handleSeenPromises = notifications.map(async (_, index) => {
      
      await handleSeen(index, true);

    });
  
    await Promise.all(handleSeenPromises);

  }

  const handleSeen = async (index: number, all: boolean = false) => {

    if (!notifications) {

      return;

    }

    const seen: boolean = notifications[index].notification.seen || false;
    const notifId: string = notifications[index].notification._id || '';

    if (!seen || all) {

      await notificationService.updateSeen(notifId);

    }
    else {

      await notificationService.updateUnseen(notifId);

    }


    setNotifications((prev: INotificationPost [] | null) => {

      if (!prev) {

        return null;

      }

      return [

        ...prev.slice(0, index),
        {
          ...prev[index],
          notification: {
            ...prev[index]?.notification,
            seen: !all ? !prev[index]?.notification?.seen : true,
          },
        },
        ...prev.slice(index + 1),

      ]

    });

  }


  return (

    <div className={ styles.container }>

      <div className={ styles.control }>

        <Dropdown
          // items={ ['All', 'Seen', 'Not seen', 'Follows', 'Messages', 'Comments', 'Ratings'] }
          items={ ['All', 'Follows', 'Messages', 'Comments', 'Ratings'] }
          value={ type }
          updateValue={ setType }
          extra='arrow'
          width='190px'
          height='50px'
          top='calc(100% + 10px)'
        />

        <Button
          type='primary'
          handleClick={ handleSeenAll }
          icon={ seen }
          width='50px'
          height='50px'
        />

      </div>

      <div className={ styles.content }>

        { !notifications ? (

          <div className={ styles.loader }><img src={ spinner } /></div>

        ) : filter(notifications).length === 0 ? (

          <div className={ styles.loader }><span>No notifications</span></div>

        ) : filter(notifications).map((notification: INotificationPost, index: number) => {

          return (
            <Notification key={ index } { ...notification } handleSeen={() => handleSeen(index)} />
          )

        })}

      </div>

    </div>

  );

}


export default Notifications;
