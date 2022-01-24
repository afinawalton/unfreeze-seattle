import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// COMPONENTS
import NavBar from './components/NavBar';
import Home from './pages';
import MyProfile from './pages/myProfile';
import MainFeed from './pages/mainFeed';
import Neighborhoods from './pages/neighbhorhoods';
import UserProfile from './components/userProfile';

const App = () =>{
  return (
    <Router>
      <NavBar />
      {/* <UserProfile /> */}
      <Routes>
        <Route exact path='/' exact element={<Home />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/main-feed' element={<MainFeed />} />
        <Route path='/neighborhoods' element={<Neighborhoods />} />
        {/* <Route path='/log-out' element={<LogOut />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
