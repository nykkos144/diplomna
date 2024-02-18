import { IAdd } from './add.interface';
import { ICheckboxGroup } from './checkbox.interface';
import { IDropdown } from './dropdown.interface';
import { IFormData } from './formData.interface';
import { IInput } from './input.interface';
import { IStyling } from './styling.interface';
import { ITextarea } from './textarea.interface';
import { IUpload } from './upload.interface';



interface IMultiForm extends IStyling {

  title: string;
  loading: string;
  complete: string;

  steps: IMultiFormStep [];

  handleSubmit: (formData: IFormData) => void;
  afterSubmit: 'close' | string;

}

interface IMultiFormStep {

  items: IMultiFormItem [];
  error?: string;
  active?: boolean;
  validate?: (formData: IFormData) => void;

}

interface IMultiFormItem {

  id: string;
  title: string;
  description: string;
  
  type: 'input' | 'textarea' | 'dropdown' | 'upload' | 'add' | 'checkbox-group';
  data: IInput | ITextarea | IDropdown | IUpload | IAdd | ICheckboxGroup;
  
  limit?: number;
  moreThan?: number;

  required?: boolean;

}


export type { IMultiForm, IMultiFormStep, IMultiFormItem }
