import React from 'react'
import './App.css'
import Login from './Elements/Login'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
