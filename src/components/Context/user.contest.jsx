import { createContext, useState } from "react";

export const UserContext = createContext({
  currenUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currenUser, setCurrentUser] = useState(null);
  const value = { currenUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
