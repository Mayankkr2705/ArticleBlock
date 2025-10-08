import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx';
import Allpost from './Pages/Allpost.jsx';
import Post from './Pages/Post.jsx';
import Editpost from './Pages/Editpost.jsx';
import Addpost from './Pages/Addpost.jsx';
import { AuthProvider } from './context/AuthContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="all-article" element={<Allpost />} />
          <Route path="edit-article/:slug" element={<Editpost />} />
          <Route path="article/:slug" element={<Post />} />
          <Route path="/add-article" element={<Addpost />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
