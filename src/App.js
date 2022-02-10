import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useFindUser from './hooks/useFindUser';
import { UserContext } from './hooks/UserContext';
// COMPONENTS
import NavBar from './components/NavBar';
import Login from './pages';
import CreateAccount from './pages/CreateAccount';
import MyUserProfile from './pages/MyUserProfile';
import Neighborhoods from './pages/Neighbhorhoods';
import EditProfile from './pages/EditProfile';
import NewsFeed from './pages/NewsFeed';
import DeleteAccount from './pages/DeleteAccount';
import UserProfile from './components/UserProfile';

const App = () => {
  const { user, setUser, isLoading } = useFindUser();

  return (
    <main className="App">
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <NavBar />
          <Routes>
            {
              user ?
                <Route path='/' element={<NewsFeed />}></Route>
              : <Route path='/' element={<Login />}></Route>
            }
            <Route path='/create-account' element={<CreateAccount />} />
            <Route path='/my-profile' element={<MyUserProfile />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            <Route path='/delete-account' element={<DeleteAccount />} />
            <Route path='/neighborhoods' element={<Neighborhoods />} />
            <Route path='/users'>
              <Route path=":userId" element={<UserProfile />} />
            </Route>
          </Routes>
        </UserContext.Provider>
    </main>
  );
}

export default App;