import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase';

const Search = ({currentUser}) => {
  const [searchWords, setSearchWords] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [searchResultId, setSearchResultId] = useState(null);
  async function handleKeyDown(e) {
    if (e.key === 'Enter') {
      // console.log(searchWords);
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("displayName", "==", searchWords));
      const results = await getDocs(q);
      results.forEach((result) => {
        setSearchResult(result.data());
        setSearchResultId(result.id);
        // console.log(result.data());
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
    } else {
      await setDoc(chatsDocRef, {
        messages:[]
      })
    }
    const userChatDocRef = doc(db, "userChats", currentUserName + searchUserName);
    const userChatDocResult = await getDoc(userChatDocRef);
    if (userChatDocResult.exists()) {
      //
    } else {
      await setDoc(userChatDocRef, {
        user1: currentUserName,
        user2: searchUserName,
        photoURL: user.data().photoURL,
        latestMessage: ""
      })
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