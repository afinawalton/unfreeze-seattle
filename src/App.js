import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProvideAuth } from './hooks/useAuth';
import { useAuth } from './hooks/useAuth';
// import useFindUser from './hooks/useFindUser';
// COMPONENTS
import NavBar from './components/NavBar';
// import Home from './pages';
import CreateAccount from './pages/CreateAccount';
import MyProfile from './pages/MyProfile';
import MainFeed from './pages/MainFeed';
import Neighborhoods from './pages/Neighbhorhoods';
import EditProfile from './pages/EditProfile';
// const axios = require('axios');

const App = () =>{
  // const { user, setUser, isLoading } = useFindUser();
  const auth = useAuth();

  return (
    <main className="App">
      <ProvideAuth>
        <Router>
          <NavBar />
          {/* <UserProfile /> */}
          <Routes>
            <Route path='/' element={<MainFeed />} />
            <Route path='/create-account' element={<CreateAccount />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            {/* <Route path='/main-feed' element={<MainFeed />} /> */}
            <Route path='/neighborhoods' element={<Neighborhoods />} />
            {/* <Route path='/log-out' element={<LogOut />} /> */}
          </Routes>
        </Router>
      </ProvideAuth>
    </main>
  );
}

export default App;
