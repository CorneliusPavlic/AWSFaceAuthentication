import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Story from './pages/Story';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Layout from './pages/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Projects from './pages/Projects';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Story />} />
        <Route path='/resume' element={<Home />} /> 
        <Route path='' element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard/>} />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

