import React, { useState } from 'react'
import Add from '../img/addAvatar.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db, storage } from '../firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { v4 as uid } from 'uuid';

const Register = () => {
    const [displayName, setDisplayName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [errMessage, setErrMessage] = useState(null);

    const navigate = useNavigate();

    function handleChangeDisplayName(e) {
        setDisplayName(e.target.value);
    }
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    function handleChangePhoto(e) {
        setPhoto(e.target.files[0]);
    }

    async function handleSignup() {
        let signupSuccess = false;
        let user;
        try {
            user = await createUserWithEmailAndPassword(auth, email, password);
            signupSuccess = true;
        } catch (e) {
            setErrMessage(e.message);
        }
        const imagesRef = ref(storage, 'image'+uid());
        await uploadBytes(imagesRef, photo);
        let photoURL = await getDownloadURL(imagesRef);
        updateProfile(user.user, {
            displayName,
            photoURL
        })
        await addDoc(collection(db, "users"), {  // add to database
            displayName,
            email,
            photoURL
        })
        if (signupSuccess) {
            console.log(user.user);
            navigate("/");
        }
    }


    return (
        <div className='register-container'>
            <h3>Lama Chat</h3>
            <p>register</p>
            <div className='register-form'>
                <input type="text" placeholder='display name' onChange={handleChangeDisplayName} required/>
                <input type="email" placeholder='email' onChange={handleChangeEmail} required />
                <input type="password" placeholder='password' onChange={handleChangePassword} required />
                <input type="file" style={{ display:'none'}} id="file" onChange={handleChangePhoto} required/>
                <label htmlFor="file">
                    <img src={Add} alt="none" />
                    <span>Add an avatar</span>
                </label>
                <button onClick={handleSignup}>Sign up</button>
                {errMessage && <p>{ errMessage }</p>}
                <p>You do have an account? <Link to="/">Login</Link></p>
            </div>
        </div>
    )
}

export default Register