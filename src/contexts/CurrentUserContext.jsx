import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState,useEffect } from "react";
import { auth } from "../firebase";

export const CurrentUserContext = createContext();

export default function CurrentUserContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log(user);
            setCurrentUser(user);
        })
        return () => {
            unsub();
        }
    }, []);
    const value = { currentUser, setCurrentUser };
    return <CurrentUserContext.Provider value={value}>
        {children}
    </CurrentUserContext.Provider>
}