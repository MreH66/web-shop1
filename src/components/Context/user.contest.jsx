import { createContext, useState } from "react";

export const UserContext = createContext({
  loadingDone: null,
  setLoadingDone: () => null,
  currenUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currenUser, setCurrentUser] = useState(null);
  const [loadingDone, setLoadingDone] = useState(false);
  const value = { currenUser, setCurrentUser, loadingDone, setLoadingDone };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
