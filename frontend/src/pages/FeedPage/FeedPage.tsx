
import styles from './FeedPage.module.css';


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
