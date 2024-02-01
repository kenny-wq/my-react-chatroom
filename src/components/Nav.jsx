import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

const Nav = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);
  const photoURL = currentUser?.photoURL;
  const displayName = currentUser?.displayName;
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