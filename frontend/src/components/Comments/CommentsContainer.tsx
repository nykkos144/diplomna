import styles from './CommentsContainer.module.css';

import { ICommentPost } from '../../interfaces/commentPost.interface';

import spinner from './../../assets/icons/spinner.svg';

import Comment from '../Comment/Comment';


const CommentsContainer = ({ comments }: { comments: ICommentPost [] | null }) => {

  return (

    <div className={ styles.container }>

      { !comments ? (

        <div className={ styles.loader }><img src={ spinner } /></div>

      ) : comments.length === 0 ? (

        <div className={ styles.loader }><span>No comments</span></div>

      ) : comments.map((comment: ICommentPost, index: number) => {

        return (

          <Comment key={ index } { ...comment } />

        );

      })}

    </div>

  );

}


export default CommentsContainer;
