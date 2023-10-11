import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const {
    potentialChats,
    potentialChatsError,
    createChat,
    setCreateChatError,
    onlineUsers,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => {
                  createChat(user?.data.id, u?.id);
                }}
              >
                {u?.first_name + "" + u?.last_name}
                <span
                  className={
                    onlineUsers?.some((user) => user?.userId === u?.id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </div>
            );
          })}
        {potentialChatsError?.error && (
          <>console.log({potentialChatsError?.message})</>
        )}
      </div>
    </>
  );
};

export default PotentialChats;
