import { useState } from 'react';

import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

//components
import DataProvider from './context/DataProvider';
import Header from './components/header/Header';
import Home from './components/home/Home';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import Movies from './components/movies/Movies';
// import Contact from './components/contact/Contact';
import Profile from './components/profile/Profile';
import Login from './components/account/Login';
import Watchlist from './components/watchlist/WatchlistPage';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> :
    <Navigate replace to='/login' />
};

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{backgroundColor:"#0C0717"}}>
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>

            {/* <Route path='/movies/details/:id'  >
              <Route path='/movies/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/movies/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/movies/update/:id' element={<Update />} />
            </Route> */}

            {/* element={<PrivateRoute isAuthenticated={isAuthenticated} />} */}
            <Route path='/movies' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/movies' element={<Movies />} />
              <Route path='/movies/update/:id' element={<Update />} />
              <Route path='/movies/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/profile' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/profile' element={<Profile />} />
            </Route>

            <Route path='/watchlist' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/watchlist' element={<Watchlist />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
