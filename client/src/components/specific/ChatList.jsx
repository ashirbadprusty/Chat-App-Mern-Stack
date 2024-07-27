import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [],
  handleDeleteChat,
}) => {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Stack width={w} direction={"column"} height="100%">
        <Stack
          width="100%"
          direction="column"
          overflow="auto"
          sx={{ flexGrow: 1 }}
        >
          {chats?.map((chat, index) => {
            const { avatar, _id, name, groupChat, members } = chat;

            const newMessageAlert = newMessagesAlert.find(
              (alert) => alert.chatId === _id
            );

            const isOnline = members?.some((member) =>
              onlineUsers.includes(member._id)
            );

            return (
              <ChatItem
                index={index}
                newMessageAlert={newMessageAlert}
                isOnline={isOnline}
                avatar={avatar}
                name={name}
                _id={_id}
                key={_id}
                groupChat={groupChat}
                sameSender={chatId === _id}
                handleDeleteChat={handleDeleteChat}
              />
            );
          })}
        </Stack>
      </Stack>
    </div>
  );
};

export default ChatList;
