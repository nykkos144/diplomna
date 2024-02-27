import { createContext, useEffect, useState } from 'react';


const ThemeContext: any = createContext(undefined);

const ThemeProvider = ({ children }: any) => {
  
  const [theme, setTheme] = useState<string>(localStorage.getItem('Theme') || 'Light');

  useEffect(() => {

    const root = document.documentElement;

    if (theme === 'Dark') {
      
      root.style.setProperty('--main', '#FE6730');

      root.style.setProperty('--primary', 'black');
      root.style.setProperty('--primary-opp', 'white');
      
      root.style.setProperty('--secondary', '#202020');
      root.style.setProperty('--secondary-hover', '#272727');
      
      root.style.setProperty('--border', '#252525');
      
      root.style.setProperty('--box-shadow', 'rgba(0, 0, 0, .05)');
      
      root.style.setProperty('--drop-shadow', '0px 0px 5px 0px rgba(255, 255, 255, 0.2)');
      
      root.style.setProperty('--primary-text', 'white');
      root.style.setProperty('--primary-text-opp', 'black');
      
      root.style.setProperty('--secondary-text', '#606060');
      root.style.setProperty('--secondary-text-hover', '#808080');
      
      root.style.setProperty('--filter-opp', 'brightness(0) saturate(100%)');
      root.style.setProperty('--filter', 'brightness(0) saturate(100%) invert(100%) sepia(24%) saturate(0%) hue-rotate(19deg) brightness(107%) contrast(101%)');
      
      root.style.setProperty('--opacity-light', '0');
      root.style.setProperty('--opacity-dark', '.1');
      
      root.style.setProperty('--error-bg', 'rgba(255, 0, 0, 0.1)');
      
      root.style.setProperty('--white-filter', 'brightness(0) saturate(100%) invert(100%) sepia(24%) saturate(0%) hue-rotate(19deg) brightness(107%) contrast(101%)');
      root.style.setProperty('--main-filter', 'brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(2185%) hue-rotate(340deg) brightness(101%) contrast(99%)');
      root.style.setProperty('--secondary-filter', 'brightness(0) saturate(100%) invert(35%) sepia(0%) saturate(600%) hue-rotate(246deg) brightness(98%) contrast(78%)');

    }
    else if (theme === 'Light') {

      root.style.setProperty('--main', '#FE6730');

      root.style.setProperty('--primary', 'white');
      root.style.setProperty('--primary-opp', 'black');
      
      root.style.setProperty('--secondary', '#f7f7f7');
      root.style.setProperty('--secondary-hover', '#f0f0f0');
      
      root.style.setProperty('--border', '#eeeeee');
      
      root.style.setProperty('--box-shadow', 'rgba(0, 0, 0, .05)');
      
      root.style.setProperty('--drop-shadow', '0px 0px 5px 0px rgba(255, 255, 255, 0.2)');
      
      root.style.setProperty('--primary-text', 'black');
      root.style.setProperty('--primary-text-opp', 'white');
      
      root.style.setProperty('--secondary-text', '#aaaaaa');
      root.style.setProperty('--secondary-text-hover', '#909090');
      
      root.style.setProperty('--filter', 'brightness(0) saturate(100%)');
      root.style.setProperty('--filter-opp', 'brightness(0) saturate(100%) invert(100%) sepia(24%) saturate(0%) hue-rotate(19deg) brightness(107%) contrast(101%)');
      
      root.style.setProperty('--opacity-light', '0');
      root.style.setProperty('--opacity-dark', '.1');
      
      root.style.setProperty('--error-bg', 'rgba(255, 0, 0, 0.1)');
      
      root.style.setProperty('--white-filter', 'brightness(0) saturate(100%) invert(100%) sepia(24%) saturate(0%) hue-rotate(19deg) brightness(107%) contrast(101%)');
      root.style.setProperty('--main-filter', 'brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(2185%) hue-rotate(340deg) brightness(101%) contrast(99%)');
      root.style.setProperty('--secondary-filter', 'brightness(0) saturate(100%) invert(73%) sepia(0%) saturate(1%) hue-rotate(141deg) brightness(93%) contrast(92%)');

    }
    else if (theme === 'Dim') {

      root.style.setProperty('--main', '#FE6730');

      root.style.setProperty('--primary', '#151515');
      root.style.setProperty('--primary-opp', 'white');
      
      root.style.setProperty('--secondary', '#303030');
      root.style.setProperty('--secondary-hover', '#353535');
      
      root.style.setProperty('--border', '#252525');
      
      root.style.setProperty('--box-shadow', 'rgba(0, 0, 0, .05)');
      
      root.style.setProperty('--drop-shadow', '0px 0px 5px 0px rgba(255, 255, 255, 0.08)');
      
      root.style.setProperty('--primary-text', 'white');
      root.style.setProperty('--primary-text-opp', 'black');
      
      root.style.setProperty('--secondary-text', '#808080');
      root.style.setProperty('--secondary-text-hover', '#909090');
      
      root.style.setProperty('--filter-opp', 'brightness(0) saturate(100%)');
      root.style.setProperty('--filter', 'brightness(0) saturate(100%) invert(100%) sepia(24%) saturate(0%) hue-rotate(19deg) brightness(107%) contrast(101%)');
      
      root.style.setProperty('--opacity-light', '0');
      root.style.setProperty('--opacity-dark', '.1');
      
      root.style.setProperty('--error-bg', 'rgba(255, 0, 0, 0.1)');
      
      root.style.setProperty('--white-filter', 'brightness(0) saturate(100%) invert(100%) sepia(24%) saturate(0%) hue-rotate(19deg) brightness(107%) contrast(101%)');
      root.style.setProperty('--main-filter', 'brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(2185%) hue-rotate(340deg) brightness(101%) contrast(99%)');
      root.style.setProperty('--secondary-filter', 'brightness(0) saturate(100%) invert(35%) sepia(0%) saturate(600%) hue-rotate(246deg) brightness(98%) contrast(78%)');

    }

  }, [theme]);

  const changeTheme = (value: string) => {

    localStorage.setItem('Theme', value);
    setTheme(value);

  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      { children }
    </ThemeContext.Provider>
  );

}


export {
  ThemeContext,
  ThemeProvider
};

