import { createContext, useContext, useState } from "react";

export const UserContext = createContext<any>(null);

function UserProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

export const useUser = () => useContext(UserContext);
