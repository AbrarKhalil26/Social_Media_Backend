import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { QUERY_KEYS } from "../config/queryKeys";

export const AuthContext = createContext(null);

export default function CounterContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [verificationData, setVerificationData] = useState(null);
  const { data: userData } = useFetch({
    queryKey: [QUERY_KEYS.USER_DATA],
    endPoint: "/users/profile",
    options: {
      enabled: !!token,
      select: (data) => data.data.user,
    },
  });
  console.log(userData);
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userData,
        verificationData,
        setVerificationData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
