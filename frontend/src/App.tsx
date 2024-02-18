import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import styles from './App.module.css';

import { IUser } from './interfaces/user.interface';

import { UserContext, UserProvider } from './contexts/user.context';

import Navbar from './components/Navbar/Navbar';
import MobileNavbar from './components/MobileNavbar/MobileNavbar';
import FeedPage from './pages/FeedPage/FeedPage';
import SearchPage from './pages/SearchPage/SearchPage';
import RecipePage from './pages/RecipePage/RecipePage';
import UserPage from './pages/UserPage/UserPage';
import NotificationsPage from './pages/NotificationsPage/NotificationsPage';
import LibraryPage from './pages/LibraryPage/LibraryPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import { ThemeProvider } from './contexts/theme.context';
import NotFound from './components/NotFound/NotFound';
import Reports from './components/Reports/Reports';


const App = () => {

  return (
    
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          
          <Container />

        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>

  );

}


const Container = () => {

  const { user, loading } = useContext<{ user: IUser | null, loading: boolean }>(UserContext);

  return (

    <>
    
      { loading ? (

        <div className={ styles.loadingContainer }>

          <div className={ styles.loader }></div>

        </div>

      ) : (

        <div className={ `${ styles.container } ${ user ? styles.logged : '' }` }>

          <Navbar />
          <MobileNavbar />

          <Routes>

            {/* <Route path='/home' element={ user ? <div style={{ height: '200vh' }}></div> : <Navigate to='/feed' /> } /> */}

            <Route path='/feed' element={ <FeedPage /> } />
            <Route path='/search' element={ <SearchPage /> } />
            <Route path='/notifications' element={ user ? <NotificationsPage /> : <Navigate to='/feed' /> } />
            <Route path='/library' element={ user ? <LibraryPage /> : <Navigate to='/feed' /> } />
            <Route path='/settings' element={ user ? <SettingsPage /> : <Navigate to='/feed' /> } />

            <Route path='/reports' element={ user && user.admin ? <Reports /> : <Navigate to='/feed' /> } />

            <Route path='/messages' element={ user ? <div></div> : <Navigate to='/feed' /> } />
            
            <Route path='/recipe/:id' element={ <RecipePage /> } />
            <Route path='/user/:username' element={ <UserPage /> } />

            <Route path='/' element={ <Navigate to='/feed' /> } />
            <Route path='*' element={ <NotFound /> } />

          </Routes>

        </div>

      )}
    
    </>

  );

}


export default App
