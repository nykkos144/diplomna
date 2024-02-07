import styles from './CheckboxGroup.module.css';

import { ICheckboxGroup } from '../../interfaces/checkbox.interface';

import Checkbox from '../Checkbox/Checkbox';


const CheckboxGroup = ({

  items,
  columns,

  value,
  addValue,
  removeValue

}: ICheckboxGroup & { value: [], addValue: (value: string) => void, removeValue: (type: 'value' | 'index', value: string | number) => void }) => {

  const updateValue = (item: string, index: number) => {

    const active: boolean = (value as string []).includes(item);

    if (!active) {

      addValue(item);
      return;

    }
    
    removeValue('value', item);

  }

  return (

    // <div className={ styles.container } style={{ gridTemplateColumns: `repeat(${ columns }, 1fr)` }}>
    <div className={ styles.container } >

      { items && items.map((item: string, index: number) => {

        return (

          <Checkbox
            key={ index }
            title={ item }
            active={ (value as string []).includes(item) }
            setActive={() => updateValue(item, index)}
          />

        );

      })}

    </div>

  );

}


export default CheckboxGroup;
