import React from 'react'
import './App.css'
import Login from './Elements/Login'
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import About from './About/About'
import User from './Dashboard/User'
import Home from './Home/Home'
import Blog from './Blog/Blog'
import Footer from "./Components/Footer";
import Signup from './Elements/Signup'
import Navbar from './Components/Navbar'
import ProtectedRoute from './Routes/ProtectedRoute'
function App() {
  const location = useLocation()
  const hideFooterOn = ['/login']

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/About" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
      {!hideFooterOn.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App
