import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Search from "../components/Search";
import Chats from "../components/Chats";
import ChatPanel from "../components/ChatPanel";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  
  // const [user, setUser] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  const [friendName, setFriendName] = useState("");

  // useEffect(() => {
  //   console.log(currentUser);
  //   if (currentUser === null) {
  //     navigate("/");
  //   }  
  // },[])
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
          navigate("/");
        }
    })
  }, []);

  return (
    <div className="home-container">
      <Nav/>
      <div className="main">
        <div className="sidebar">
          <Search />
          <Chats />
        </div>
        <ChatPanel/>
      </div>
    </div>
  );
};

export default Home;
