import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Alert, Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChat";
import { useLocation } from "react-router-dom";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } =
    useContext(ChatContext);
  return (
    <Container>
      <PotentialChats />
      {userChats?.length < 1 || userChats == null ? (
        <>
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="flex-grow-0 message-box pe-3" gap={4}>
              {isUserChatsLoading ? (
                <p>Loading Chats</p>
              ) : (
                <p>Click to Start a Chat</p>
              )}
            </Stack>
            <p>ChatBox</p>
          </Stack>
        </>
      ) : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="flex-grow-0 message-box pe-3" gap={4}>
            {isUserChatsLoading && <p>Loading Chats....!!</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
