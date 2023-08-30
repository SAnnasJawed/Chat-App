import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  }, []);

  //   REGISTER USER
  const navigate = useNavigate();

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);
      const resonse = await postRequest(
        `${baseUrl}/user/register`,
        JSON.stringify(registerInfo)
      );
      setIsRegisterLoading(false);
      if (resonse.error) {
        return setRegisterError(resonse);
      } else {
        alert("Successfully Registered....");
        navigate("/login", { replace: true });
      }
    },
    [registerInfo]
  );

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  //   LOGIN USER

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);
      const response = await postRequest(
        `${baseUrl}/user/signin`,
        JSON.stringify(loginInfo)
      );
      setIsLoginLoading(false);
      if (response.error) {
        return setLoginError(response);
      }
      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
    },
    [loginInfo]
  );

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  // LOGOUT USER
  const logoutUser = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  });
  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        registerError,
        updateRegisterInfo,
        registerUser,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        isLoginLoading,
        loginInfo,
        updateLoginInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
