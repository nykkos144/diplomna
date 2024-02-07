import { IDropdown } from './dropdown.interface';
import { IInput } from './input.interface';
import { IStyling } from './styling.interface';


interface IAdd extends IStyling {

  items: IAddItem [];
  type: 'ingredients' | 'steps';

}

interface IAddItem {

  type: 'input' | 'dropdown';
  data: IInput | IDropdown

}


export type { IAdd, IAddItem }
