import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProvideAuth } from './use-auth';
// COMPONENTS
import NavBar from './components/NavBar';
import Home from './pages';
import SignUp from './pages/signUp';
import MyProfile from './pages/myProfile';
import MainFeed from './pages/mainFeed';
import Neighborhoods from './pages/neighbhorhoods';
const axios = require('axios');

const App = () =>{
  return (
    <main className="App">
      <ProvideAuth>
        <Router>
          <NavBar />
          {/* <UserProfile /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/main-feed' element={<MainFeed />} />
            <Route path='/neighborhoods' element={<Neighborhoods />} />
            {/* <Route path='/log-out' element={<LogOut />} /> */}
          </Routes>
        </Router>
      </ProvideAuth>
    </main>
  );
}

export default App;
