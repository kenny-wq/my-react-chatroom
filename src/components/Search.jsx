import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { db } from '../firebase';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentFriendContext } from '../contexts/CurrentFriendContext';

const Search = () => {
  const { setCurrentFriend:setFriendName } = useContext(CurrentFriendContext);
  const [searchWords, setSearchWords] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchResultId, setSearchResultId] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  async function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("displayName", "==", searchWords));
      const results = await getDocs(q);
      results.forEach((result) => {  // assume that there is only one result
        setSearchResult(result.data());
        setSearchResultId(result.id);
      })
    }
  }
  function handleValueChange(e) {
    setSearchWords(e.target.value);
  }
  async function handleResultClick() {
    const docRef = doc(db, "users", searchResultId);
    const user = await getDoc(docRef);
    let currentUserUid = currentUser.uid;
    let currentUserName = currentUser.displayName;
    let searchUserUid = user.data().uid;
    let searchUserName = user.data().displayName;
    const chatsId = currentUserUid < searchUserUid ? currentUserUid + searchUserUid : searchUserUid + currentUserUid; 
    const chatsDocRef = doc(db, "chats", chatsId);
    const chatsDocResult = await getDoc(chatsDocRef);
    if (chatsDocResult.exists()) {
      // update chat doc result;
      setFriendName(searchUserName);
    } else {
      await setDoc(chatsDocRef, {
        messages:[]
      })
    }
    const userToSearchUserDocRef = doc(db, "userChats", currentUserUid + searchUserUid);
    const userToSearchUserDocResult = await getDoc(userToSearchUserDocRef);
    if (userToSearchUserDocResult.exists()) {
      //
    } else {
      try {
        await setDoc(userToSearchUserDocRef, {
          user1: {uid:currentUser.uid,name:currentUser.displayName,photoURL: currentUser.photoURL},
          user2: user.data(),
          photoURL: user.data().photoURL,
          latestMessage: ""
        })
        const searchUserToUserDocRef = doc(db, "userChats", searchUserUid + currentUserUid);
        await setDoc(searchUserToUserDocRef, {
          user1: user.data(),
          user2: {uid:currentUser.uid,displayName:currentUser.displayName,photoURL: currentUser.photoURL},
          photoURL: currentUser.photoURL,
          latestMessage: ""
        })
      } catch (e) {
        console.log(e);
      }
      
    }
    setSearchResult(null);
    setSearchWords("");
  }
  return (
    <>
      <div className='search'>
        <input type="text" placeholder='search' value={searchWords} onChange={handleValueChange} onKeyDown={handleKeyDown}/>
      </div>
      {searchResult &&
        <div className='search-result' onClick={handleResultClick}>
          <img src={searchResult.photoURL} alt=""/>
          <p>{searchResult.displayName}</p>
        </div>
      }
    </>
  )
}

export default Search