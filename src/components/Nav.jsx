import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Nav = ({photoURL,displayName}) => {
  const navigate = useNavigate();
  function handleLogout() {
    signOut(auth).then(() => {
      navigate("/");
    })
  }
  return (
    <div className='nav'>
      <div className='userinfo'>
        <img src={photoURL} alt="" />
        <p>{displayName}</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <div className='remain'></div>
    </div>
  )
}

export default Nav