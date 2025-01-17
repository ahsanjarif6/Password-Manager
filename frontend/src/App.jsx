import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Homepage where the user will see their saved passwords
import CreatePassword from './pages/CreatePassword'; // Page for adding new passwords
import ShowPassword from './pages/ShowPassword'; // Page for viewing details of a specific password
import EditPassword from './pages/EditPassword'; // Page for editing a specific password
import DeletePassword from './pages/DeletePassword'; // Page for deleting a specific password
import Login from './pages/Login'; // Login page
import Register from './pages/Register'; // Register page
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/" element={<Home />} />
      <Route path="/user/passwords/create" element={<CreatePassword />} />
      <Route path="/user/passwords/details/:id" element={<ShowPassword />} />  
      <Route path="/user/passwords/edit/:id" element={<EditPassword />} />
      <Route path="/user/passwords/delete/:id" element={<DeletePassword />} />
    </Routes>
  );
  // return (
  //   <Routes>
  //     <Route path="/" element={<Home />} /> {/* Home page where passwords are listed */}
  //     <Route path="/passwords/create" element={<CreatePassword />} /> {/* Create new password */}
  //     <Route path="/passwords/details/:id" element={<ShowPassword />} /> {/* Show details of a password */}
  //     <Route path="/passwords/edit/:id" element={<EditPassword />} /> {/* Edit password */}
  //     <Route path="/passwords/delete/:id" element={<DeletePassword />} /> {/* Delete password */}
  //     <Route path="/login" element={<Login />} /> {/* Login page */}
  //     <Route path="/register" element={<Register />} /> {/* Register page */}
  //   </Routes>
  // );
};

export default App;
