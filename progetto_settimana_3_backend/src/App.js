import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/style.css';
import WPpages from './pages/WPpages.jsx'
import UsersPage from './pages/UsersPage.jsx';
import HomePage from './pages/HomePage.jsx'
import PostsPage from './pages/PostsPage.jsx';
import HeaderComp from './Components/HeaderComp.jsx'
import DetailsPage from './pages/DetailsPage.jsx';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComp />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pages' element={<WPpages />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/posts' element={<PostsPage />} />
          <Route path='/posts/:id' element={<DetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
