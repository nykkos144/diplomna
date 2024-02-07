import styles from './SignInForm.module.css';


import { IMultiForm } from './../../interfaces/multiform.interface';
import { IFormData } from './../../interfaces/formData.interface';
import { IButton } from '../../interfaces/button.interface';

import * as userService from './../../services/user.service';

import signIn from './../../assets/icons/sign-in.svg';

import MultiForm from './../MultiForm/MultiForm';


const SignInForm = ({ buttonData, full }: { buttonData?: Partial<IButton>, full?: boolean }) => {


  const handleSubmit = async (formData: IFormData) => {

    const { username, password } = formData;

    const res: string = await userService.login(username as string, password as string);
  
    localStorage.setItem('Authorization', res);

  }

  const data: IMultiForm = {

    title: 'Sign in',
    loading: 'Signing in',
    complete: 'You have signed in',

    steps: [
      {
        items: [
          {
            id: 'username',
            title: 'Username',
            description: 'Enter your username',
            type: 'input',
            required: true,
            data: {
              title: 'Username',
              type: 'text'
            }
          },
          {
            id: 'password',
            title: 'Password',
            description: 'Enter your password',
            type: 'input',
            required: true,
            data: {
              title: 'Password',
              type: 'password'
            }
          }
        ],
      }
    ],

    handleSubmit: handleSubmit,
    afterSubmit: '/feed'

  }
  
  return (

    <MultiForm { ...data } 
      buttonData={{
        type: 'secondary',
        icon: signIn,
        iconSize:'16px',
        ...buttonData
      }}
      full={ full }
    />

  );

}


export default SignInForm;


