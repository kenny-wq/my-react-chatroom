import React, { useContext, useEffect, useState } from 'react'
import { collection, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentFriendContext } from '../contexts/CurrentFriendContext';

const Chats = () => {
  const { setCurrentFriend: setFriendName } = useContext(CurrentFriendContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [chats, setChats] = useState([]);
  const currentUserName = currentUser?.displayName;
  useEffect(() => {
    async function fetchData() {
      if (currentUserName) {
        const q = query(collection(db, "userChats"), where("user1", "==", currentUserName));
        onSnapshot(q, (results) => {
          setChats([]); // clear chats
          results.forEach((doc) => {  // copy all chats to chats
            setChats((chats)=>[...chats, doc.data()])
          })
        })
      }
    }
    fetchData();
  }, [currentUserName])
  function handleFriendClick(chat) {
    setFriendName(chat.user2);
  }
  
  return (
    <div className='chats'>
      {chats && chats.map((chat,idx) => {
        return <div className='user-chat' key={idx} onClick={()=>{handleFriendClick(chat)}}>
          <img src={chat.photoURL} alt="" />
          <div>
            <p>{chat.user2}</p>
            <p className="latest-message">{chat.latestMessage}</p>
          </div>
        </div>
      })}
    </div>
  )
}

export default Chats