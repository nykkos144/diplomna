import { ReactNode } from 'react';


interface IModal {

  children: ReactNode;
  type: 'dropdown' | 'modal' | 'ellipsis';

  isOpen: boolean;
  handleOpen: () => void;

}


export type { IModal }
