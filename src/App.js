import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ProvideAuth } from './hooks/useAuth';
// import { useAuth } from './hooks/useAuth';
import useFindUser from './hooks/useFindUser';
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
// COMPONENTS
import NavBar from './components/NavBar';
import Login from './pages';
import CreateAccount from './pages/CreateAccount';
import MyProfile from './pages/MyProfile';
import Neighborhoods from './pages/Neighbhorhoods';
import EditProfile from './pages/EditProfile';
// const axios = require('axios');

const App = () =>{
  const { user, setUser, isLoading } = useFindUser();
  // const auth = useAuth();

  return (
    <main className="App">
      {/* <ProvideAuth> */}
        <Router>
          <UserContext.Provider value={{ user, setUser, isLoading }}>
            <NavBar />
            {/* <UserProfile /> */}
            <Routes>
              <Route path='/' element={<PrivateRoute />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/create-account' element={<CreateAccount />} />
              <Route path='/my-profile' element={<MyProfile />} />
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/neighborhoods' element={<Neighborhoods />} />
            </Routes>
          </UserContext.Provider>
        </Router>
      {/* </ProvideAuth> */}
    </main>
  );
}

export default App;
