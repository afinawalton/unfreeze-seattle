import React from 'react';
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
import MainFeed from './pages/MainFeed';

const App = () => {
  const { user, setUser, isLoading } = useFindUser();

  return (
    <main className="App">
        <Router>
          <UserContext.Provider value={{ user, setUser, isLoading }}>
            <NavBar />
            {
              user ?
              <Routes>
                <Route path='/' element={<MainFeed />}></Route>
                <Route path='/create-account' element={<CreateAccount />} />
                <Route path='/my-profile' element={<MyProfile />} />
                <Route path='/edit-profile' element={<EditProfile />} />
                <Route path='/neighborhoods' element={<Neighborhoods />} />
              </Routes>
              :
              <Routes>
                <Route path='/' element={<Login />}></Route>
              </Routes>
            }
          </UserContext.Provider>
        </Router>
    </main>
  );
}

export default App;