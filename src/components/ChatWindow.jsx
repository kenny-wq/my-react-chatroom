import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentFriendContext } from '../contexts/CurrentFriendContext';
import Message from './Message';

const ChatWindow = () => {
  const { currentFriend:friendName } = useContext(CurrentFriendContext);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  const currentUserName = currentUser?.displayName;
  useEffect(() => {
    async function fetch() {
      if (friendName) {
        let nameId; // chat的id
        if (currentUserName < friendName) {
          nameId = currentUserName + friendName;
        } else {
          nameId = friendName + currentUserName;
        }
        console.log(nameId);
        const docRef = doc(db, "chats", nameId);
        onSnapshot(docRef, (results) => {
            if (results.exists()) {
              setMessages(results.data().messages);
            }
            else {
              console.log(results);
            }
        })
        console.log(friendName);
        console.log(messages);
      }
    }
    fetch();
  }, [friendName])
  return (
    <div className='chatwindow'>
      {messages && messages.map((message, idx) => {
        return <Message key={idx} message={message}/>
      })}
    </div>
  )
}

export default ChatWindow