import { useContext } from 'react';

import styles from './CommentsBar.module.css';

import { IUser } from '../../interfaces/user.interface';
import { ICommentPost } from '../../interfaces/commentPost.interface';

import { UserContext } from '../../contexts/user.context';

import * as userService from './../../services/user.service';

import libraryStroke from './../../assets/icons/library-stroke.svg';
import libraryFilled from './../../assets/icons/library-filled.svg';

import CreateCommentForm from '../CreateCommentForm/CreateCommentForm';
import Button from '../Button/Button';
import CommentsContainer from '../Comments/CommentsContainer';


const CommentsBar = ({
  
  id,
  comments,
  saved,
  setSaved

}: { id: string, comments: ICommentPost [] | null, saved: boolean, setSaved: (value: boolean) => void }) => {

  const loggedUser = useContext<{ user: IUser | null, loading: boolean }>(UserContext).user;

  // const [saved, setSaved] = useState<boolean>(loggedUser && loggedUser.saved?.includes(id) ? true : false);

  const handleSaveClick = async () => {

    await userService.saveRecipe(id);
    
    setSaved(true);

  }

  const handleUnsaveClick = async () => {

    await userService.unsaveRecipe(id);

    setSaved(false);

  }

  return (

    <div className={ styles.container }>

      <div className={ styles.top }>

        <CreateCommentForm
          submitData={{
            recipeId: id as string
          }}
          buttonData={{
            content: (comments?.length || 0).toString(),
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

      </div>

      <CommentsContainer comments={ comments } />

    </div>

  );

}


export default CommentsBar;
