import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Search from "../components/Search";
import Chats from "../components/Chats";
import ChatPanel from "../components/ChatPanel";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  
  onAuthStateChanged(auth, (user) => {
    console.log("execute");
    if (user) {
      setUser(user);
    } else {
      navigate("/");
    }
  })


  return (
    <div className="home-container">
      <Nav photoURL={user?.photoURL} displayName={user?.displayName } />
      <div className="main">
        <div className="sidebar">
          <Search currentUser={user}/>
          <Chats />
        </div>
        <ChatPanel />
      </div>
    </div>
  );
};

export default Home;
