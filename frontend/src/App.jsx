import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/dashboard' exact element={<Home/>}/>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/signup' exact element={<SignUp/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
