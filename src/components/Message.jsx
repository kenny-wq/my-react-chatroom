import React, { useContext, useEffect, useRef } from 'react'
import { CurrentFriendContext } from '../contexts/CurrentFriendContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Message = ({ message }) => {
    const { currentFriend: friendName } = useContext(CurrentFriendContext);
    const { currentUser } = useContext(CurrentUserContext);
    const currentUserName = currentUser?.displayName;
    const ref = useRef();
    useEffect(() => {
        ref.current.scrollIntoView({behavior: "smooth"})
    },[message])
    
    return <div ref={ref} className={message.user===currentUserName?'user-message':'friend-message'}>
                {message.user===friendName&&<img className='photo' src={message.photoURL} alt="" />}
                {message.type==="message"&&<p>{message.content}</p>}
                {message.type === "image" && <img src={message.content} alt="" />}
                {message.user===currentUserName&&<img className='photo' src={message.photoURL} alt="" />}
            </div>
}

export default Message