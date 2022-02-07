import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useFindUser from './hooks/useFindUser';
import { UserContext } from './hooks/UserContext';
// COMPONENTS
import NavBar from './components/NavBar';
import Login from './pages';
import CreateAccount from './pages/CreateAccount';
import MyProfile from './pages/MyProfile';
import Neighborhoods from './pages/Neighbhorhoods';
import EditProfile from './pages/EditProfile';
import MainFeed from './pages/MainFeed';
import DeleteAccount from './pages/DeleteAccount';
import UserProfile from './components/UserProfile';

const App = () => {
  const { user, setUser, isLoading } = useFindUser();

  return (
    <main className="App">
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <NavBar />
          {
            user ?
            <Routes>
              <Route path='/' element={<MainFeed />}></Route>
              <Route path='/my-profile' element={<MyProfile />} />
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/delete-account' element={<DeleteAccount />} />
              <Route path='/neighborhoods' element={<Neighborhoods />} />
              <Route path='/users'>
                <Route path=":userId" element={<UserProfile users={allUsers} />} />
              </Route>
            </Routes>
            :
            <Routes>
              <Route path='/' element={<Login />}></Route>
              <Route path='/create-account' element={<CreateAccount />} />
            </Routes>
          }
        </UserContext.Provider>
    </main>
  );
}

export default App;