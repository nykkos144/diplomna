import { IStyling } from './styling.interface';


interface IEllipsis extends IStyling {

  id?: string;
  
  items: IEllipsisItem [];

  icon?: string;
  iconActive?: string;
  title?: string;

  extra?: 'arrow';

}

interface IEllipsisItem {

  title: string;
  icon?: string;
  handleClick: () => void;

}


export type { IEllipsis, IEllipsisItem }