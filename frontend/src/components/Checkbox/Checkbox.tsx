import styles from './Checkbox.module.css';

import check from './../../assets/icons/check.svg';

const Checkbox = ({

  title,
  
  active,
  setActive,

}: { title: string, active: boolean, setActive: () => void }) => {

  return (

    <div className={ `${ styles.container } ${( active ? styles.active : '' )}` } onClick={ setActive }>

      <div>
        <img src={ check } />
      </div>
      <span>{ title }</span>

    </div>

  );

}


export default Checkbox;
