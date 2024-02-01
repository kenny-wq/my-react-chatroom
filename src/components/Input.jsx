import React, { useContext, useState } from 'react'
import Img from '../img/img.png'
import { arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { v4 as uuid } from 'uuid';
import { CurrentFriendContext } from '../contexts/CurrentFriendContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Input = () => {
  const {currentFriend:friendName} = useContext(CurrentFriendContext);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  const currentUserName = currentUser?.displayName;
  const photoURL = currentUser?.photoURL;
  
  function handleMessageValueChange(e) {
    setMessage(e.target.value);
  }
  function handleImageValueChange(e) {
    setImage(e.target.files[0]);
  }
  async function handleButtonClick() {
    if (friendName) {
      let nameId; // chat 的 id
      console.log("here");
      if (currentUserName < friendName) {
        nameId = currentUserName + friendName;
      }
      else {
        nameId = friendName + currentUserName;
      }
      if (message) {
        //update chat message
        await updateDoc(doc(db, "chats", nameId), { messages: arrayUnion({ id: uuid(), content: message, user: currentUserName, photoURL, type: "message" }) });
        //update currentUser latest message
        await updateDoc(doc(db, 'userChats', currentUserName + friendName), { latestMessage: message });
        //update friend latest message
        await updateDoc(doc(db, 'userChats', friendName + currentUserName), { latestMessage: message });
        setMessage("");
      }
      if (image) {
        const imagesRef = ref(storage, 'image'+uuid());
        await uploadBytes(imagesRef, image);
        let messageImageURL = await getDownloadURL(imagesRef);
        //update chat message
        await updateDoc(doc(db, "chats", nameId), { messages: arrayUnion({ id: uuid(), content: messageImageURL, user: currentUserName, photoURL, type: "image" }) });
        //update currentUser latest message
        await updateDoc(doc(db, 'userChats', currentUserName + friendName), { latestMessage: 'image' });
        //update friend latest message
        await updateDoc(doc(db, 'userChats', friendName + currentUserName), { latestMessage: 'image' });
        setImage("");
      }
    }
  }
  
  return (
    <div className='input'>
      <div className="text-input">
        <input type="text" onChange={handleMessageValueChange} value={message}/>
      </div>
      <div className="label">
        <input type="file" style={{ display: 'none' }} id='chat-input-file' onChange={handleImageValueChange} />
        <label htmlFor="chat-input-file">
          <img src={Img} alt="" />
        </label>
      </div>
      <div className='button'>
        <button onClick={handleButtonClick}>send</button>
      </div>
    </div>
  )
}

export default Input