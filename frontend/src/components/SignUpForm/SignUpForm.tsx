
import { IMultiForm } from './../../interfaces/multiform.interface';
import { IFormData } from './../../interfaces/formData.interface';
import { IButton } from '../../interfaces/button.interface';

import * as userService from './../../services/user.service';

import signUp from './../../assets/icons/sign-up.svg';

import MultiForm from './../MultiForm/MultiForm';


const SignUpForm = ({ buttonData, full }: { buttonData?: Partial<IButton>, full?: boolean }) => {

  const validateUnique = async (formData: any) => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(formData.email)) {
      throw new Error('Invalid email');
    }

    await userService.checkUnique(formData.username, formData.email);

  }

  const validateMatch = async (formData: any) => {

    if(formData.password !== formData.repeatPassword) {
      throw new Error('Passwords don\'t match');
    }

  }

  const handleSubmit = async (formData: IFormData) => {

    const formDataSend = new FormData();

    formDataSend.append('username', (formData.username as string));
    formDataSend.append('email', (formData.email as string));

    formDataSend.append('password', (formData.password as string));

    if (formData.fullName) {
      formDataSend.append('fullName', (formData.fullName as string));
    }

    if (formData.bio) {
      formDataSend.append('bio', (formData.bio as string));
    }

    if (formData.profilePicture.length > 0 && formData.profilePicture[0]) {
      formDataSend.append(`pictures`, (formData.profilePicture[0] as File));
    }
    
    await userService.createUser(formDataSend);

  }

  const data: IMultiForm = {

    title: 'Sign up',
    loading: 'Signing up',
    complete: 'You have signed up',

    steps: [
      {
        items: [
          {
            id: 'username',
            title: 'Username',
            description: 'Choose a unique username to personalize your profile',
            type: 'input',
            limit: 20,
            moreThan: 4,
            required: true,
            data: {
              title: 'Username',
              type: 'text'
            }
          },
          {
            id: 'email',
            title: 'Email',
            description: 'Add email so you can verify your account',
            type: 'input',
            limit: 254,
            required: true,
            data: {
              title: 'Email',
              type: 'text'
            }
          }
        ],
        validate: validateUnique
      },
      {
        items: [
          {
            id: 'password',
            title: 'Password',
            description: 'Create a secure password to protect your account',
            type: 'input',
            moreThan: 5,
            required: true,
            data: {
              title: 'Password',
              type: 'password'
            }
          },
          {
            id: 'repeatPassword',
            title: 'Repeat password',
            description: 'Repeat your password to ensure it\'s accuracy',
            type: 'input',
            required: true,
            data: {
              title: 'Repeat password',
              type: 'password'
            }
          }
        ],
        validate: validateMatch
      },
      {
        items: [
          {
            id: 'fullName',
            title: 'Full name',
            description: 'Enter your full name as you\'d like it to appear on your profile',
            type: 'input',
            limit: 40,
            data: {
              title: 'Full name',
              type: 'text'
            }
          },
          {
            id: 'bio',
            title: 'Bio',
            description: ' Craft a brief bio to share a bit about yourself',
            type: 'textarea',
            limit: 200,
            data: {
              title: 'Bio'
            }
          }
        ]
      },
      {
        items: [
          {
            id: 'profilePicture',
            title: 'Profile picture',
            description: 'Upload a profile picture to personalize your profile',
            type: 'upload',
            data: {
              type: 'crop',
              accept: ['images/*']
            }
          }
        ]
      }
    ],

    handleSubmit: handleSubmit,
    afterSubmit: 'close'

  }
  
  return (

    <MultiForm { ...data } 
      buttonData={{
        type: 'primary',
        icon: signUp,
        iconSize:'16px',
        ...buttonData
      }}
      full={ full }
    />

  );

}


export default SignUpForm;
