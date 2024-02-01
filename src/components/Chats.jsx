import React, { useContext, useEffect, useState } from 'react'
import { collection, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentFriendContext } from '../contexts/CurrentFriendContext';

const Chats = () => {
  const { setCurrentFriend } = useContext(CurrentFriendContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        const q = query(collection(db, "userChats"), where("user1.uid", "==", currentUser.uid));
        onSnapshot(q, (results) => {
          setChats([]); // clear chats
          results.forEach((doc) => {  // copy all chats to chats
            setChats((chats)=>[...chats, doc.data()])
          })
        })
      }
    }
    fetchData();
  }, [currentUser])
  function handleFriendClick(chat) {
    setCurrentFriend(chat.user2);
  }
  
  return (
    <div className='chats'>
      {chats && chats.map((chat,idx) => {
        return <div className='user-chat' key={idx} onClick={()=>{handleFriendClick(chat)}}>
          <img src={chat.photoURL} alt="" />
          <div>
            <p>{chat.user2.displayName}</p>
            <p className="latest-message">{chat.latestMessage}</p>
          </div>
        </div>
      })}
    </div>
  )
}

export default Chats