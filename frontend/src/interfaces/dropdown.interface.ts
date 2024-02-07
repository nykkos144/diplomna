import { IStyling } from './styling.interface';


interface IDropdown extends IStyling {

  id?: string;
  
  items: string [];  
  extra?: 'arrow';

  disabled?: boolean;

}


export type { IDropdown }
