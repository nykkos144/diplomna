import styles from './SettingsBar.module.css';

import account from './../../assets/icons/account-stroke.svg';
import cust from './../../assets/icons/cust.svg';
import arrRight from './../../assets/icons/arr-right.svg';


const SettingsBar = ({ type, setType }: { type: string, setType: (value: string) => void }) => {

  const items = [
    {
      title: 'Account',
      icon: account
    },
    {
      title: 'Customization',
      icon: cust
    }
  ]

  return (

    <div className={ styles.container }>

      { items.map((item: any, index: number) => {

        return (

          <div key={ index } className={ `${ styles.item } ${ type === item.title ? styles.active : '' }` } onClick={() => setType(item.title)} >

            <img src={ item.icon } className={ styles.icon } />
            <span className={ styles.title }>{ item.title }</span>
            <img src={ arrRight } className={ styles.arr } />

          </div>

        )

      })}

    </div>

  );

}


export default SettingsBar;
