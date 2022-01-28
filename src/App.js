import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// COMPONENTS
import NavBar from './components/NavBar';
import Home from './pages';
import SignUp from './pages/signUp';
import MyProfile from './pages/myProfile';
import MainFeed from './pages/mainFeed';
import Neighborhoods from './pages/neighbhorhoods';
// import UserProfile from './components/userProfile';
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
    // console.log('Correct data format: ', fakeUser);
    console.log('User-inputted data:', userData);
    axios.post('http://localhost:8080/users', userData)
        .then(res => {
            console.log('Added new user: ', res);
            const data = res.data;
            console.log('Data from response: ', data);
            setCurrentUser(data[1]);
            console.log(data[1]);
        })
        .catch(err => {
            console.log('This is the error: ', err);
        })
  }

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
