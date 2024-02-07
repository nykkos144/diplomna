import { useEffect, useState } from 'react';

import styles from './CreateCommentForm.module.css';

import { IButton } from '../../interfaces/button.interface';
import { IFormData } from '../../interfaces/formData.interface';
import { IMultiForm } from '../../interfaces/multiform.interface';

import * as commentService from './../../services/comment.service';

import commentStroke from './../../assets/icons/comment-stroke.svg';

import MultiForm from '../MultiForm/MultiForm';


const CreateCommentForm = ({ submitData, buttonData }: { submitData?: IFormData, buttonData?: Partial<IButton> }) => {

  const [content, setContent] = useState<number>(Number(buttonData!.content));

  useEffect(() => {

    setContent(Number(buttonData!.content));

  }, [buttonData?.content])

  const handleSubmit = async (formData: IFormData) => {

    const { comment } = formData;

    await commentService.createComment(submitData!.recipeId as string, comment as string);

    setContent(prev => prev + 1);

  }
  

  const data: IMultiForm = {

    title: 'Create comment',
    loading: 'Creating comment',
    complete: 'Comment has been created',

    steps: [
      {
        items: [
          {
            id: 'comment',
            title: 'Comment',
            description: 'Leave a comment to share your thoughts or tips on this recipe',
            type: 'textarea',
            limit: 200,
            required: true,
            data: {
              title: 'Comment',
            }
          }
        ],
      },
    ],

    handleSubmit: handleSubmit,
    afterSubmit: 'close'

  }
  
  return (

    <MultiForm { ...data } 
      buttonData={{
        type: 'secondary',
        icon: commentStroke,
        iconSize: '14px',
        ...buttonData,
        content: content.toString()
      }}
    />

  );

}

export default CreateCommentForm;
