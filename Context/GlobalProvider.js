import React, { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);


  return (
    <GlobalContext.Provider
      value={{
        searched,
        setSearched,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;