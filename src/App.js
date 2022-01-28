import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// COMPONENTS
import NavBar from './components/NavBar';
import Home from './pages';
import SignUp from './pages/signUp';
import MyProfile from './pages/myProfile';
import MainFeed from './pages/mainFeed';
import Neighborhoods from './pages/neighbhorhoods';
const axios = require('axios');

const App = () =>{
  const [currentUser, setCurrentUser] = useState({});

  const addUser = (userData) => {
    const fakeUser = {
      first_name: 'Afina',
      email: 'email.com',
      password: 'pwd',
      birthdate: '1995-05-30',
      work: 'work',
      interests: [''],
      pronouns: 'she/her',
      city:'seattle',
      neighborhood: 'northgate',
      resident_type: 'local',
      years_in_wa: 8,
      user_profile: {
        bio: '',
        top_interest: '',
        blurb: 'blurb',
        prompt_answers: {
            "How are you today?": '',
            "How will you be tomorrow?": ''
        }
      }
    }
    console.log('User-inputted data:', userData);
    axios.post('http://localhost:8080/users', userData)
        .then(res => {
            console.log('New user successfully created!');
            setCurrentUser(res.data);
        })
        .catch(err => {
            console.log(err);
        })
  }
  // It /is/ setting currentUser, but because it's an asyncrhonous function, it takes a while to update
  useEffect(()=>{ console.log(currentUser); },[currentUser]);

  return (
    <main className="App">
      <Router>
        <NavBar />
        {/* <UserProfile /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-up' element={<SignUp addUserCallback={addUser} />} />
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
