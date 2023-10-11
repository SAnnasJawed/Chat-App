import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, getRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [potentialChatsError, setPotentialChatsError] = useState(null);
  const [createChatError, setCreateChatError] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // console.log("Cuur chat chat context", currentChat);
  // console.log("onlineUSers", onlineUsers);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?.data?.id);
    socket.on("getOnlineUsers", (response) => {
      setOnlineUsers(response);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // send Message Using Socket IO
  useEffect(()=>{
    if(socket === null) return;
    let recipientId = 0;
    // const recipientId = currentChat?.members?.find((id) => id !== user?.data?.id)
    for (let prop in currentChat?.members) {
      if (currentChat?.members.hasOwnProperty(prop)) {
        if (currentChat?.members[prop] != user?.data.id) {
          recipientId = currentChat?.members[prop];
        }
      }
    }
    console.log("rCID", recipientId);
    socket.emit("sendMessage", {...newMessage, recipientId})
  }, [newMessage])

  // recieve Message using Socket IO

  useEffect(()=>{
    if(socket === null) return console.log("Null");;
    socket.on("getMessage", response =>{
      console.log("curr", currentChat);
      console.log("res", response);
      if(currentChat?.id != response?.response?.chatId) return console.log("ERROR");
      console.log("socket", socket);
      console.log("response:", response);
      setMessages((prev) => [...prev, response?.response])
    })
    return () => {
      socket.off("getMessage")
    }

  }, [socket, currentChat])



  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/user/getusers`);
      // console.log(response);
      if (response?.error) {
        return console.log("Some Error Occured: ", error);
      }
      const pChats = response?.filter((u) => {
        let isChatCreated = false;
        // console.log("uID", u?.id);
        if (user?.data.id == u.id) return false;
        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            // console.log(chat?.members?.firstId);
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

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);
      // console.log("Currchat:", currentChat);
      // console.log("in curr id:", currentChat?.id);
      const response = await getRequest(
        `${baseUrl}/messages/getmessages/${currentChat?.id}`
      );
      console.log("response", response);
      setIsMessagesLoading(false);
      if (response?.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    // console.log("firstID: ", firstId, "secondID: ", secondId);
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
      // console.log("response: ", response);
    }
  }, []);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("Please type a message to send!!");
      const response = await postRequest(
        `${baseUrl}/messages/sendmessage`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender,
          text: textMessage,
        })
      );
      if (response?.error) {
        return setSendTextMessageError(response);
      }
      setNewMessage(response);
      setMessages((prev) => [...prev, response?.response]);
      setTextMessage("");
    },
    []
  );

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
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
