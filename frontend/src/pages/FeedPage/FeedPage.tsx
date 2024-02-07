import { useContext } from 'react';

import styles from './FeedPage.module.css';

import { IUser } from '../../interfaces/user.interface';
import { UserContext } from '../../contexts/user.context';

import RecommBar from '../../components/RecommBar/RecommBar';
import Feed from '../../components/Feed/Feed';


const FeedPage = () => {

  // const { user, loading } = useContext<{ user: IUser | null, loading: boolean }>(UserContext);

  return (

    <>
    
      <Feed />

      {/* { user && <RecommBar /> } */}

      <div className={ styles.fixedContainer }>

        <div className={ styles.fixed }>

          <RecommBar minified={ true } />

        </div>

      </div>


    </>

  );

}


export default FeedPage;
