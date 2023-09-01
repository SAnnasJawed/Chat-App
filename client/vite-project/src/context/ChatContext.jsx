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
      const response = await getRequest(`${baseUrl}/user/getusers`);
      console.log(response);
      if (response?.error) {
        return console.log("Some Error Occured: ", error);
      }
      const pChats = response?.filter((u) => {
        let isChatCreated = false;
        console.log("uID", u?.id);
        if (user?.data.id == u.id) return false;
        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            console.log(chat?.members?.firstId);
            return (
              chat?.members?.firstId == u.id || chat?.members?.secondId == u.id
            );
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
      setUserChats((prev) => [...prev, response]);
      setIsUserChatsLoading(false);
      console.log("response: ", response);
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
