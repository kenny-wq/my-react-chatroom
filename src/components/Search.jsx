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
    console.log(user.data());
    console.log(currentUser);
    let currentUserName = currentUser.displayName;
    let searchUserName = user.data().displayName;
    const name = currentUserName < searchUserName ? currentUserName + searchUserName : searchUserName + currentUserName; 
    const chatsDocRef = doc(db, "chats", name);
    const chatsDocResult = await getDoc(chatsDocRef);
    if (chatsDocResult.exists()) {
      // update chat doc result;
      setFriendName(searchUserName);
    } else {
      await setDoc(chatsDocRef, {
        messages:[]
      })
    }
    const userToSearchUserDocRef = doc(db, "userChats", currentUserName + searchUserName);
    const userToSearchUserDocResult = await getDoc(userToSearchUserDocRef);
    if (userToSearchUserDocResult.exists()) {
      //
    } else {
      try {
        await setDoc(userToSearchUserDocRef, {
          user1: currentUserName,
          user2: searchUserName,
          photoURL: user.data().photoURL,
          latestMessage: ""
        })
        const searchUserToUserDocRef = doc(db, "userChats", searchUserName + currentUserName);
        await setDoc(searchUserToUserDocRef, {
          user1: searchUserName,
          user2: currentUserName,
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
          <img src={searchResult.photoURL} alt="" />
          <p>{searchResult.displayName}</p>
        </div>
      }
    </>
  )
}

export default Search