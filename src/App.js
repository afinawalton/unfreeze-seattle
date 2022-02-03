import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  const { user, setUser, isLoading } = useFindUser();
  // const [user, setUser] = useState(null);

  return (
    <main className="App">
        <Router>
          <UserContext.Provider value={{ user, setUser, isLoading }}>
            <NavBar />
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
    </main>
  );
}

export default App;