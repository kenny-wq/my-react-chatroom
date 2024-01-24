import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleSignIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/home");
      }).catch((error) => {
        setErrMessage(error.message)
      })
  }
  return (
    <div className='login-container'>
        <h3>Lama Chat</h3>
        <p>login</p>
        <div className='login-form'>
            <input type="text" placeholder='email'  onChange={handleChangeEmail}/>
            <input type="password" placeholder='password' onChange={handleChangePassword}/>
            <button onClick={handleSignIn}>Login</button>
            {errMessage&&<p>{errMessage}</p>}
            <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login