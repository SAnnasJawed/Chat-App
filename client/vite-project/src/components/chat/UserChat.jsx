import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipientUser";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({ chat, user }) => {
  // console.log("UserChat:", chat);
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const {onlineUsers} = useContext(ChatContext)
  // console.log("recipientUser: ", recipientUser);
  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);
    // console.log("RU", chat);
    const isUserOnline = onlineUsers?.some((user)=> user?.userId === recipientUser?.user?.id)
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="35px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.user.first_name + " " + recipientUser?.user.last_name}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">08/25/2023</div>
        <div className="this-user-notification">2</div>
        <span className={isUserOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};
export default UserChat;
