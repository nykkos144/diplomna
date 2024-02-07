import styles from './MultiFormStep.module.css';

import { IMultiFormItem, IMultiFormStep } from './../../interfaces/multiform.interface';
import { IFormData, IFormDataProps } from './../../interfaces/formData.interface';

import MultiFormItem from './../MultiFormItem/MultiFormItem';


const MultiFormStep = ({ items, values, error, active, setValue, addValue, removeValue }: IMultiFormStep & IFormDataProps) => {
  
  return (
    
    <div className={ `${ styles.container } ${( active ? styles.active : '')}` }>

      { error && <div className={ styles.error }>{ error }</div> }

      { items && items.map((item: IMultiFormItem, index: number) => (
        
        <MultiFormItem
          key={ index }
          { ...item }
          value={ values[item.id] }
          setValue={(value: string | File []) => setValue(item.id, value)}
          addValue={(value: string | File | IFormData) => addValue(item.id, value)}
          removeValue={(type: 'value' | 'index', value: string | number) => removeValue(item.id, type, value)}
        />

      ))}

    </div>

  );

}


export default MultiFormStep;
