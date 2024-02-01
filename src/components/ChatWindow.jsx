import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentFriendContext } from '../contexts/CurrentFriendContext';
import Message from './Message';

const ChatWindow = () => {
  const { currentFriend } = useContext(CurrentFriendContext);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  const currentUserName = currentUser?.displayName;
  useEffect(() => {
    async function fetch() {
      if (currentFriend) {
        let chatId; 
        if (currentUser.uid < currentFriend.uid) {
          chatId = currentUser.uid + currentFriend.uid;
        } else {
          chatId = currentFriend.uid + currentUser.uid;
        }
        const docRef = doc(db, "chats", chatId);
        onSnapshot(docRef, (results) => {
            if (results.exists()) {
              setMessages(results.data().messages);
            }
            else {
              console.log(results);
            }
        })
      }
    }
    fetch();
  }, [currentFriend])
  return (
    <div className='chatwindow'>
      {messages && messages.map((message, idx) => {
        return <Message key={idx} message={message}/>
      })}
    </div>
  )
}

export default ChatWindow