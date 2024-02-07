interface IFormData {

  [key: string]: string | any []

}

interface IFormDataProps {

  values: IFormData;

  setValue: (id: string, value: string | File []) => void;
  addValue: (id: string, value: string | File | IFormData) => void;
  removeValue: (id: string, type: 'value' | 'index', value: string | number) => void;

}

interface IFormDataPropsInner {

  value: string | any [];

  setValue: (value: string | File []) => void;
  addValue: (value: string | File | IFormData) => void;
  removeValue: (type: 'value' | 'index', value: string | number) => void;

}


// interface ISignUpFormData {

//   username: string;
//   email: string;
//   password: string;
//   repeatPassword: string;
//   fullName?: string;
//   bio?: string;
//   profilePicture: File;

//   profileVisibility?: string;

// }

// interface ISignInFormData {

//   username: string;
//   password: string;

// }

// interface IRecipeFormData {



// }


export type {
  IFormData,
  IFormDataProps,
  IFormDataPropsInner
  // ISignUpFormData,
  // ISignInFormData,
  // IRecipeFormData
}
