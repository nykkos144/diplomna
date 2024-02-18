import { createContext, useEffect, useState } from 'react';

import { IUser } from '../interfaces/user.interface';

import * as userService from '../services/user.service';


const UserContext: any = createContext({ user: null, loading: true });

const UserProvider = ({ children }: any) => {
  
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const getLoggedUser = async () => {

      try {

        const user: IUser = await userService.getLoggedUser();
        
        setUser(user);

      }
      catch (error) {
        
        console.log('Error fetching user data: ' + (error as Error).message);
        
      }

      // setTimeout(() => {
        setLoading(false);
      // }, 500);
      
    };

    getLoggedUser();
    
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      { children }
    </UserContext.Provider>
  );

}


export {
  UserContext,
  UserProvider
};
