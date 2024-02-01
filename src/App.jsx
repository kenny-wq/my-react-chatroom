import { useContext, useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { CurrentUserContext } from './contexts/CurrentUserContext'

function App() {
  const { currentUser } = useContext(CurrentUserContext);

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/" />;
  //   }
  //   else {
  //     return children;
  //   }
  // }

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='home' element={
          // <ProtectedRoute>
            <Home/>
          // </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App
