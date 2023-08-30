import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, getRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [potentialChatsError, setPotentialChatsError] = useState(null);
  const [createChatError, setCreateChatError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      // console.log("checking");
      const response = await getRequest(`${baseUrl}/user/getusers`);
      if (response?.error) {
        return console.log("Some Error Occured: ", error);
      }
      const pChats = response?.filter((u) => {
        let isChatCreated = false;
        if (user?.data.id == u.id) return false;
        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat?.members?.[0] == u.id || chat?.members?.[1] == u.id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pChats);
    };
    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      console.log("checking");
      if (user?.data.id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(
          `${baseUrl}/chats/finduserchat/${user?.data.id}`
        );
        setIsUserChatsLoading(false);
        if (response?.error) {
          return setUserChatsError(response);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  const createChat = useCallback(async (firstId, secondId) => {
    debugger
    console.log("firstID: ", firstId, "secondID: ", secondId);
    const response = await postRequest(
      `${baseUrl}/chats/createchat`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );
    if (response?.error) {
      return console.log("Error Occured: ", error);
    } else {
      setUserChats((prev) => [...prev, response?.response]);
      setIsUserChatsLoading(false);
      console.log(response);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        potentialChatsError,
        createChat,
        setCreateChatError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
