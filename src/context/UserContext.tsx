import { createContext, useState } from "react";

const UserContext = createContext<any>(null);

function UserProvider({ children }: any) {
  const [user, setUser] = useState({
    username: "hoadv",
    email: "hoadv@gmail.com",
  });
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
