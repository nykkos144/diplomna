interface IUpload {

  type: 'single' | 'multiple' | 'crop',
  accept: string [],

  // value: File [],
  // setValue: (value: File []) => void

}


export type { IUpload }
