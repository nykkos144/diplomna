import { useContext, useEffect, useState } from 'react';
import styles from './Settings.module.css';
import MultiFormItem from '../MultiFormItem/MultiFormItem';
import Button from '../Button/Button';

import * as userService from './../../services/user.service';
import { ThemeContext } from '../../contexts/theme.context';



const Settings = ({ type }: { type: string }) => {


  const { theme, changeTheme } = useContext<{ theme: string, changeTheme: (value: string) => void }>(ThemeContext);


  const accountSettings: any = [
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
    } ,
    {
      id: 'profilePicture',
      title: 'Profile picture',
      description: 'Upload a profile picture to personalize your profile',
      type: 'upload',
      data: {
        type: 'crop',
        accept: ['images/*']
      }
    },
    {
      id: 'backdrop',
      title: 'Backdrop',
      description: 'Upload a backdrop to personalize your profile',
      type: 'upload',
      data: {
        type: 'single',
        accept: ['images/*']
      }
    }
  ];

  const custSettings: any = [
    {
      id: 'theme',
      title: 'Theme',
      description: 'Choose between multiple themes',
      type: 'dropdown',
      data: {
        items: ['Light', 'Dark', 'Dim'],
        extra: 'arrow',
        top: 'calc(100% + 10px)'
      }
    },
  ];


  const [formData, setFormData] = useState<any>(null);


  const initialize = () => {

    const initialFormData: any = {};

    (type === 'Account' ? accountSettings : custSettings).forEach((data: any) => {

      const { id, type } = data;

      if (id === 'theme') {

        initialFormData[id] = localStorage.getItem('Theme');

      }
      else {

        initialFormData[id] = type !== 'upload' ? '' : [];
      
      }

    });

    setFormData(initialFormData);

  };

  useEffect(() => {

    initialize();

  }, [type, localStorage]);


  const setValue = (id: string, value: string | File) => {

    setFormData((prev: any) => ({
      ...prev,
      [id]: value
    }));

  }

  const removeValue = (id: string, type: 'value' | 'index', value: string | number) => {

    setFormData((prev: any) => ({
      ...prev,
      [id]: (prev[id] as any []).filter((val: string, index: number) => type === 'value' ? val !== value : index !== value )
    }));

  }


  const handleCancel = () => {

    initialize();

  }

  const handleSubmit = async () => {

    if (type === 'Customization') {

      changeTheme(formData.theme);

    }
    else {

      const formDataSend = new FormData();

      // formDataSend.append('fullName', (formData.fullName.trim() as string));
      // formDataSend.append('bio', (formData.bio.trim() as string));

      if (formData.fullName) {
        formDataSend.append('fullName', (formData.fullName.trim() as string));
      }
  
      if (formData.bio) {
        formDataSend.append('bio', (formData.bio.trim() as string));
      }
  
      if (formData.profilePicture.length > 0 && formData.profilePicture[0]) {
        formDataSend.append(`pictures`, (formData.profilePicture[0] as File));
      }

      if (formData.backdrop.length > 0 && formData.backdrop[0]) {
        formDataSend.append(`backdrop`, (formData.backdrop[0] as File));
      }
      
      await userService.updateSettings(formDataSend);

    }

    initialize();

  }


  const hasChange = formData && Object.keys(formData).some((key: string) => {

    const value = formData[key];

    if (key === 'theme') {

      return value !== localStorage.getItem('Theme');

    }

    return typeof value === 'string' ? value.trim().length > 0 : value.length > 0;

  });

  return (

    <div className={ styles.container }>
      
      { formData && (type === 'Account' ? accountSettings : custSettings).map((item: any, index: number) => {

        return (

          <MultiFormItem
            key={ index }
            { ...item }
            value={ item.id === 'theme' ? formData[item.id] || localStorage.getItem('Theme') : formData[item.id] || '' }
            setValue={(value: string) => setValue(item.id, value)}
            removeValue={(type: 'value' | 'index', value: string | number) => removeValue(item.id, type, value)}
          />

        );

      })}

      <div className={ `${ styles.control } ${ hasChange ? styles.active : '' }` }>

        <Button
          type='secondary'
          handleClick={ handleCancel }
          content='Cancel'
          // width='100%'
          height='100%'
          fontSize='14px'
        />

        <Button
          type='primary'
          handleClick={ handleSubmit }
          content='Update'
          // width='100%'
          height='100%'
          fontSize='14px'
        />

      </div>

    </div>

  )

}


export default Settings;
