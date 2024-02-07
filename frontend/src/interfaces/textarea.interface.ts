import { IStyling } from './styling.interface';


interface ITextarea extends IStyling {

  title: string;

  limit?: number;

  // value: string;
  // setValue: (value: string) => void;
  
}


export type { ITextarea }
