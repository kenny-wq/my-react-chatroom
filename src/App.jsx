import { useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='home' element={<Home/>} />
      </Route>
    </Routes>
  )
}

export default App
