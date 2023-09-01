import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  // const [error, setError] = useState(null);
  // console.log(chat);
  let recipientId = 0;
  for (let prop in chat?.members) {
    // console.log(chat?.members[prop]);
    // console.log(chat?.members.hasOwnProperty(prop));
    if (chat?.members.hasOwnProperty(prop)) {
      if (chat?.members[prop] !== user?.data.id) {
        recipientId = chat?.members[prop];
      }
    }
  }
  // console.log("Rec: ", recipientId);
  // console.log(Object.values(chat?.members));
  // const recipientId =  chat?.members?.find((id) => id != user?.data.id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return console.log("No Recipient ID");

      const response = await getRequest(
        `${baseUrl}/user/getuser/${recipientId}`
      );

      if (response.error) {
        return console.log("Error Occured: ", error);
      }
      setRecipientUser(response);
    };
    getUser();
  }, []);
  return { recipientUser };
};
