import { createContext, useState } from "react";

export const CurrentFriendContext = createContext();

export default function CurrentFriendContextProvider({ children }) {
    const [currentFriend, setCurrentFriend] = useState(null);
    const value = { currentFriend, setCurrentFriend };
    return <CurrentFriendContext.Provider value={value}>
        {children}
    </CurrentFriendContext.Provider>
}