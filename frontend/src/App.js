import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './components/Feed';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import PostForm from './components/PostForm';
import Messages from './components/message';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />        
        <Route path="/profile" element={<Profile />} />
        <Route path="/postForm" element={<PostForm />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/messages/:userId1/:userId2" element={<Messages />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
