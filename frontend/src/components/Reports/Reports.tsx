import { useEffect, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import styles from './Reports.module.css';
import { IRecipePost } from '../../interfaces/recipePost.interface';
import { IUser } from '../../interfaces/user.interface';

import * as reportService from './../../services/report.service';
import * as recipeService from './../../services/recipe.service';
import * as userService from './../../services/user.service';

import spinner from './../../assets/icons/spinner.svg';
import Entity from '../Entity/Entity';
import RecipePost from '../RecipePost/RecipePost';
import { IUserPost } from '../../interfaces/userPost.interface';
import Button from '../Button/Button';
import { getTimeElapsed } from '../../utils/time.util';


const Reports = () => {

  const [type, setType] = useState<string>('');

  const [results, setResults] = useState<IRecipePost [] | IUserPost [] | null>(null);

  const [dismissed, setDismissed] = useState<string []>([]);

  
  useEffect(() => {

    const fetchUsers = async () => {

      const data: IUserPost [] = await reportService.getUsers();

      setResults(data);

    }
    const fetchRecipes = async () => {

      const data: IRecipePost [] = await reportService.getRecipes();
      
      setResults(data);

    }

    setResults(null);

    type === 'Users' ? fetchUsers() : fetchRecipes();

  }, [type]);


  const handleSeen = async (id: string) => {

    await reportService.dismissReport(id);

    setDismissed(prev => ([
      ...prev,
      id
    ]));

  }

  const handleDelete = async (type: string, id: string, reportId: string) => {

    if (type === 'user') {

      await userService.deleteUser(id);

    }
    else {

      await recipeService.deleteRecipe(id);
    
    }

    handleSeen(reportId);

  }


  return (

    <div className={ styles.container }>

      <div className={ styles.control }>

        <Dropdown
          items={ ['Recipes', 'Users'] }
          value={ type }
          updateValue={ setType }
          extra='arrow'
          width='190px'
          height='50px'
          top='calc(100% + 10px)'
        />

      </div>

      <div className={ styles.content }>

        { !results ? (

          <div className={ styles.loader }><img src={ spinner } /></div>

        ) : results.length === 0 ? (

          <div className={ styles.loader }><span>No reports found</span></div>

        ) : results.map((item: IRecipePost | IUserPost, index: number) => {

          if (dismissed.includes(item.report?._id!)) {

            return;

          }

          return (

            <div key={ index } className={ styles.entity }>

              { type === 'Users' ? (

                <Entity type='user' content={ (item as IUserPost).user } />

              ) : (

                <>

                  { ((item as IRecipePost).recipe && (item as IRecipePost).user) && (
                    
                    <Entity type='recipe' content={ item as IRecipePost } />

                  )}
                
                </>


              )}

              <div className={ styles.entityControl }>

                <div className={ styles.entityControlItem }>

                  <span className={ styles.data }>{ getTimeElapsed(item.report?.createdAt ? new Date(item.report?.createdAt) : new Date()) }</span>

                </div>

                <div className={ styles.entityControlItem }>

                  <Button
                    type='secondary'
                    handleClick={() => handleSeen(item.report?._id!)}
                    content='Dismiss report'
                    width='fit-content'
                    height='34px'
                    padding='0px 15px'
                  />

                  <Button
                    type='primary'
                    handleClick={() => handleDelete(type === 'Users' ? 'user' : 'recipe', item.report?.reportedId!, item.report?._id!)}
                    content='Delete'
                    width='fit-content'
                    height='34px'
                    padding='0px 15px'
                  />

                </div>

              </div>

            </div>

          );

        }) }

      </div>

    </div>

  );

}


export default Reports;
