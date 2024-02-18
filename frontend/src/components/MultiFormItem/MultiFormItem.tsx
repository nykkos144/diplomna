import styles from './MultiFormItem.module.css';

import { IMultiFormItem } from './../../interfaces/multiform.interface';
import { IFormDataPropsInner } from './../../interfaces/formData.interface';
import { IInput } from './../../interfaces/input.interface';
import { ITextarea } from './../../interfaces/textarea.interface';

import Input from './../Input/Input';
import Textarea from './../Textarea/Textarea';
import Dropdown from '../Dropdown/Dropdown';
import { IDropdown } from '../../interfaces/dropdown.interface';
import UploadShowcase from '../UploadShowcase/UploadShowcase';
import { IUpload } from '../../interfaces/upload.interface';
import AddBlock from '../AddBlock/AddBlock';
import { IAdd } from '../../interfaces/add.interface';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import { ICheckboxGroup } from '../../interfaces/checkbox.interface';


const MultiFormItem = ({
  
  title,
  description,
  type,
  data,
  limit,
  moreThan,
  required,

  value,
  setValue,
  addValue,
  removeValue

}: IMultiFormItem & IFormDataPropsInner) => {

  return (

    <div className={ styles.container }>

      <label className={ styles.top }>
        <span className={ styles.title }>{ title } <span>{ required && '*' }</span></span>
        { (limit || moreThan) && (
          <span className={ `${ styles.limiter } ${ (moreThan ? styles.moreThan : '') }` }>
            { moreThan ? <>{ moreThan } { '>' } <span>{ value.length }</span></> : value.length } { limit && `/ ${ limit }` }
          </span>
        )}
      </label>
      
      <p className={ styles.description }>{ description }</p>
      
      { type === 'input' ? (

        <Input
          { ...(data as IInput) }
          limit={ limit }
          value={ (value as string) }
          updateValue={ setValue }
        />

      ) : type === 'textarea' ? (

        <Textarea
          { ...(data as ITextarea) }
          limit={ limit }
          value={ (value as string) }
          updateValue={ setValue }
        />

      ) : type === 'dropdown' ? (

        <Dropdown
          { ...(data as IDropdown) }
          value={ (value as string) }
          updateValue={ setValue }
        />

      ) : type === 'upload' ? (

        <UploadShowcase
          { ...(data as IUpload) }
          value={ value as File [] }
          updateValue={ setValue }
          addValue={ addValue }
          removeValue={ removeValue }
        />

      ) : type === 'checkbox-group' ? (

        <CheckboxGroup
          { ...(data as ICheckboxGroup) }
          value={ value as  [] }
          addValue={ addValue }
          removeValue={ removeValue }
        />

      ) : type === 'add' ? (

        <AddBlock
          { ...(data as IAdd) }
          value={ value as [] }
          addValue={ addValue }
          removeValue={ removeValue }
        />

      ) : '' }

    </div>

  );

}


export default MultiFormItem;
