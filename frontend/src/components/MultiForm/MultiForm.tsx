import { useEffect, useRef, useState } from 'react';

import styles from './MultiForm.module.css';
import stepStyles from './../MultiFormStep/MultiFormStep.module.css';

import { IButton } from '../../interfaces/button.interface';
import { IMultiForm, IMultiFormStep } from '../../interfaces/multiform.interface';
import { IFormData } from '../../interfaces/formData.interface';

import checkBig from './../../assets/icons/check-big.svg';
import spinnerBig from './../../assets/icons/spinner-big.svg';
import closeX from './../../assets/icons/close-x.svg';

import Button from '../Button/Button';
import MultiFormStep from '../MultiFormStep/MultiFormStep';


const MultiForm = ({
  
  title,
  loading,
  complete,
  steps,
  handleSubmit,
  afterSubmit,
  buttonData,
  full,
  ...stylingProps

}: IMultiForm & { full?: boolean, buttonData: IButton }) => {

  const {
    
    width,
    height,

  } = stylingProps;
  
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {

    setOpen(prev => !prev);

  }

  const [formData, setFormData] = useState(() => {

    const initialFormData: Record<string, string | any[]> = {};

    steps.forEach((step) => {
      step.items.forEach((item) => {
        initialFormData[item.id] = ['input', 'textarea', 'dropdown'].includes(item.type) ? '' : []
      });
    });

    return initialFormData;

  });

  const [errors, setErrors] = useState<{[key: string]: string}>();

  
  const [currentStep, setCurrentStep] = useState<number>(0);

  
  const isLoading = currentStep === steps.length;
  const isCompleted = currentStep === steps.length + 1;

  const timeoutRef = useRef<any>(null);
  
  useEffect(() => {
    
    return () => {

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

    };

  }, []);

  const resetForm = () => {

    setTimeout(() => {

      setErrors(undefined);
      setCurrentStep(0);

      setFormData(() => {

        const initialFormData: Record<string, string | any[]> = {};
    
        steps.forEach((step) => {
          step.items.forEach((item) => {
            initialFormData[item.id] = ['input', 'textarea', 'dropdown'].includes(item.type) ? '' : []
          });
        });
    
        return initialFormData;
    
      });

    }, 200);
    
  }


  const validateRequired = (): void => {

    const stepItems = steps[currentStep].items;

    for (let i = 0; i < stepItems.length; i++) {

      const item = formData[stepItems[i].id];

      if (!stepItems[i].required) {
        continue;
      }

      if (Array.isArray(item)) {

        if (item.length === 0) {
          throw new Error(`${ stepItems[i].title } is required`);
        }

        continue;

      }

      if (!item || item.trim() === '') {

        throw new Error(`${ stepItems[i].title } is required`);

      }
    
    }
    
  }

  const validateLimit = (): void => {

    const stepItems = steps[currentStep].items;

    for (let i = 0; i < stepItems.length; i++) {
      
      const item = formData[stepItems[i].id];

      const limit: number | undefined = stepItems[i].limit;
      const moreThan: number | undefined = stepItems[i].moreThan;

      if (!limit && !moreThan) {
        continue;
      }

      // if (stepItems[i].type === 'upload-single' && limit) {

      //   if (item && (Number((item.size / (1024 * 1024)).toFixed(2)) > limit)) {
      //     throw new Error(`${ stepItems[i].title } must be less than ${ limit } MB`);
      //   }

      //   continue;

      // }

      if (limit) {

        if (Array.isArray(item)) {

          if (item.length > limit) {
            throw new Error(`${ stepItems[i].title } must be less than ${ limit }`);
          }
  
          continue;
  
        }

        if (item && item.trim().length > limit) {
          throw new Error(`${ stepItems[i].title } must be less than ${ limit }`);
        }

      }

      if (moreThan) {

        if (Array.isArray(item)) {

          if (item.length <= moreThan) {
            throw new Error(`${ stepItems[i].title } must be more than ${ moreThan }`);
          }
  
          continue;
  
        }

        if (!item || item.trim().length <= moreThan) {
          throw new Error(`${ stepItems[i].title } must be more than ${ moreThan }`);
        }

      }
    
    }

  }


  const handleBack = () => {

    setCurrentStep(prev => prev - 1);

  }
  const handleNext = async () => {

    try {

      validateRequired();
      validateLimit();

      await steps[currentStep].validate?.(formData);
  
      setCurrentStep(prev => prev + 1);
      setErrors(undefined);

    }
    catch (error) {

      setErrors({
        [ currentStep ]: (error as any).response ? (error as any).response.data.error : (error as Error).message
      });
      
    }

  }

  const onCancel = () => {

    resetForm();
    handleOpen();

  }
  const onSubmit = async () => {

    try {

      setCurrentStep(currentStep => currentStep + 1);

      validateRequired();
      validateLimit();
  
      await steps[currentStep].validate?.(formData);
  
      await handleSubmit(formData);
  
      setErrors(undefined);
  
      timeoutRef.current = setTimeout(() => {
  
        setCurrentStep(currentStep => currentStep + 1);
  
      }, 700);
        
      timeoutRef.current = setTimeout(() => {
  
        afterSubmit === 'close' ?
        handleOpen() :
        afterSubmit.startsWith('/') ?
        location.href = afterSubmit : ''
  
        resetForm();
  
      }, 1200);

    }
    catch (error) {
      
      timeoutRef.current = setTimeout(() => {
        
        setErrors({
          [ currentStep ]: (error as any).response ? (error as any).response.data.error : (error as Error).message
        });
        setCurrentStep(currentStep => currentStep - 1);
  
      }, 700);

    }
  }


  const setValue = (id: string, value: string | File []) => {

    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

  }

  const addValue = (id: string, value: string | File | IFormData) => {

    setFormData(prev => ({
      ...prev,
      [id]: [...prev[id], value]
    }));

  }

  const removeValue = (id: string, type: 'value' | 'index', value: string | number) => {

    setFormData(prev => ({
      ...prev,
      [id]: (prev[id] as any []).filter((val: string, index: number) => type === 'value' ? val !== value : index !== value )
    }));

  }


  return (

    <div className={ `${ styles.container } ${ open ? styles.open : '' }` } style={{ width: full ? '100%' : '', height: full ? '100%' : '' }}>

      <div className={ styles.cover } onClick={ handleOpen }></div>

      <Button
        { ...buttonData }
        handleClick={ handleOpen }
      />

      <div className={ styles.contentContainer}>

        <div className={ styles.content } style={{ width: width, height: height }}>

          <div className={ styles.top }>

            <span className={ styles.title }>{ title.toUpperCase() }</span>

            <Button
              type='secondary'
              icon={ closeX }
              handleClick={ onCancel }
              width='34px'
              height='34px'
              iconSize='10px'
              disabled={ isLoading ? true : false }
            />

          </div>
          
          <div className={ styles.progressBar }>
            <div></div>
            <div style={{ width: `${ (100 / (steps.length + 1)) * currentStep }%` }}></div>
          </div>


          <div className={ styles.formContent } style={{ width: `calc(${ steps.length + 2 } * 100%)`, marginLeft: `-${ 100 * currentStep }%` }}>

            { steps && steps.map((step: IMultiFormStep, index: number) => (

              <MultiFormStep
                key={ index }
                { ...step }
                error={ errors && errors[index] }
                active={ currentStep === index ? true : false }
                values={ formData }
                setValue={ setValue }
                addValue={ addValue }
                removeValue={ removeValue }
              />

            ))}

            <div className={ `${ stepStyles.container } ${ stepStyles.special } ${ stepStyles.loading } ${( isLoading ? stepStyles.active : '')}` }>

              <img src={ spinnerBig } alt="" />
              <h1>Loading</h1>
              <span>{ loading }</span>

            </div>

            <div className={ `${ stepStyles.container } ${ stepStyles.special } ${ stepStyles.completed } ${( isCompleted ? stepStyles.active : '')}` }>

              <img src={ checkBig } alt="" />
              <h1>Successful</h1>
              <span>{ complete }</span>

            </div>

          </div>
            
          { currentStep < steps.length && (

            <div className={ styles.bottom }>

              <Button
                type='secondary'
                content='Cancel'
                secondaryContent='Back'
                secondaryContentActive={ currentStep > 0 ? true : false }
                handleClick={( currentStep === 0 ? onCancel : handleBack )}
                height='50px'
                fontSize='14px'
              />

              <Button
                type='primary'
                content='Next'
                secondaryContent='Submit'
                secondaryContentActive={ currentStep === steps.length - 1 ? true : false }
                handleClick={( currentStep === steps.length - 1 ? onSubmit : handleNext )}
                height='50px'
                fontSize='14px'
              />

            </div>

          )}

        </div>

      </div>

    </div>

  );
  
}


export default MultiForm;
