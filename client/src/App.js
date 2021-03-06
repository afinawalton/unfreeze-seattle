// REACT & REACT-ROUTER
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// HOOKS
import useFindUser from './hooks/useFindUser';
import { UserContext } from './hooks/UserContext';

// COMPONENTS
import NavBar from './components/NavBar';
import Login from './pages';
import CreateAccount from './pages/CreateAccount';
import MyUserProfile from './pages/MyUserProfile';
import Neighborhoods from './pages/Neighborhoods';
import EditProfile from './pages/EditProfile';
import NewsFeed from './pages/NewsFeed';
import DeleteAccount from './pages/DeleteAccount';
import UserProfile from './components/UserProfile';
import Neighborhood from './components/Neighborhood';

const App = () => {
  const { user, setUser, isLoading } = useFindUser();

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className="App">
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <NavBar />
          <Routes>
            {
              user ? <Route path='' element={<NewsFeed />} />
              : <Route path='' element={<Login />} />
            }
              <Route path='/login' element={<Login />} />
              <Route path='/create-account' element={<CreateAccount />} />
              <Route path='/my-profile' element={<MyUserProfile />} />
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/delete-account' element={<DeleteAccount />} />
              <Route path='/users' element={<NewsFeed />} />
              <Route path="/users/:userId" element={<UserProfile />} />
              <Route path='/neighborhoods' element={<Neighborhoods />} />
              <Route path="/neighborhoods/:townId" element={<Neighborhood />} />
          </Routes>
        </UserContext.Provider>
        <footer>
          <p>
              Unfreeze Seattle © 2022 | Made with love <span role='img' aria-label='heart'>❤️</span> by <a href='https://afinawalton.github.io/'>Afina Walton</a>
          </p>
        </footer>
    </main>
  );
}

export default App;