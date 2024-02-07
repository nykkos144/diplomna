import styles from './NotFound.module.css';


const NotFound = () => {

  return (

    <div className={ styles.container }>

      <span className={ styles.main }>404</span>
      <span className={ styles.secondary }>Page not found</span>

    </div>

  );

}


export default NotFound;

