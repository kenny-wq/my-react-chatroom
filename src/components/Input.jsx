import React, { useContext, useState } from 'react'
import Img from '../img/img.png'
import { arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { v4 as uuid } from 'uuid';
import { CurrentFriendContext } from '../contexts/CurrentFriendContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Input = () => {
  const {currentFriend} = useContext(CurrentFriendContext);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  const currentUserId = currentUser?.uid;
  const photoURL = currentUser?.photoURL;
  
  function handleMessageValueChange(e) {
    setMessage(e.target.value);
  }
  function handleImageValueChange(e) {
    setImage(e.target.files[0]);
  }
  async function handleButtonClick() {
    if (currentFriend) {
      let chatId; // chat 的 id
      if (currentUserId < currentFriend.uid) {
        chatId = currentUserId + currentFriend.uid;
      }
      else {
        chatId = currentFriend.uid + currentUserId;
      }
      if (message) {
        //update chat message
        await updateDoc(doc(db, "chats", chatId), { messages: arrayUnion({ id: uuid(), content: message, user: currentUser.uid, photoURL, type: "message" }) });
        //update currentUser latest message
        await updateDoc(doc(db, 'userChats', currentUserId + currentFriend.uid), { latestMessage: message });
        //update friend latest message
        await updateDoc(doc(db, 'userChats', currentFriend.uid + currentUserId), { latestMessage: message });
        setMessage("");
      }
      if (image) {
        const imagesRef = ref(storage, 'image'+uuid());
        await uploadBytes(imagesRef, image);
        let messageImageURL = await getDownloadURL(imagesRef);
        //update chat message
        await updateDoc(doc(db, "chats", chatId), { messages: arrayUnion({ id: uuid(), content: messageImageURL, user: currentUser.uid, photoURL, type: "image" }) });
        //update currentUser latest message
        await updateDoc(doc(db, 'userChats', currentUserId + currentFriend.uid), { latestMessage: 'image' });
        //update friend latest message
        await updateDoc(doc(db, 'userChats', currentFriend.uid + currentUserId), { latestMessage: 'image' });
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