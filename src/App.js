import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// COMPONENTS
import NavBar from './components/NavBar';
import Home from './pages';
import SignUp from './pages/signUp';
import MyProfile from './pages/myProfile';
import MainFeed from './pages/mainFeed';
import Neighborhoods from './pages/neighbhorhoods';
// import UserProfile from './components/userProfile';

const App = () =>{
  return (
    <main className="App">
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
    </main>
  );
}

export default App;
