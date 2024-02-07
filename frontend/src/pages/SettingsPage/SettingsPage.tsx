import styles from './SettingsPage.module.css';

import Settings from '../../components/Settings/Settings';
import { useState } from 'react';
import SettingsBar from '../../components/SettingsBar/SettingsBar';
import Dropdown from '../../components/Dropdown/Dropdown';


const SettingsPage = () => {

  const [type, setType] = useState<string>('Account');

  return (

    <>

      <div className={ styles.content }>

        <div className={ styles.secondary }>

          <Dropdown
            items={ ['Account', 'Customization'] }
            value={ type }
            updateValue={ setType }
            extra='arrow'
            top='calc(100% + 10px)'
          />

        </div>
        
        <Settings type={ type } />

      </div>

      <div className={ styles.fixedContainer }>

        <div className={ styles.fixed }>

          <SettingsBar type={ type } setType={ setType } />

        </div>

      </div>

    </>

  )

}


export default SettingsPage; 

