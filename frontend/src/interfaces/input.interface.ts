import { IStyling } from './styling.interface';


interface IInput extends IStyling {

  id?: string;
  
  title: string;
  type: 'text' | 'password' | 'number';
  
  limit?: number;
  
}

export type { IInput }