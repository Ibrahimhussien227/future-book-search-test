import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(
    JSON.parse(localStorage.getItem("CURRENT_USER"))
  );

  const setUser = (currentUser) => {
    _setUser(currentUser);
    if (currentUser) {
      localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("CURRENT_USER");
    }
  };

  return (
    <StateContext.Provider value={{ user, setUser }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
