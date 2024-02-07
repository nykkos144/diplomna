import { IStyling } from './styling.interface';


interface IButton extends IStyling {

  type: 'primary' | 'secondary';
  
  icon?: string;
  content?: string;
  secondaryContent?: string;
  secondaryContentActive?: boolean;
  disabled?: boolean;

}


export type { IButton }
