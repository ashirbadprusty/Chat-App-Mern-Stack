import { faker, simpleFaker } from "@faker-js/faker";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js"; // Make sure this is the correct import path for the Message model
import { User } from "../models/user.js";

// Function to create single chats between users
const createSingleChats = async () => {
  try {
    const users = await User.find().select("_id");

    if (users.length < 2) {
      console.log("Not enough users to create chats");
      process.exit(1);
    }

    const chatsPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatsPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i]._id, users[j]._id], // Corrected members array
          })
        );
      }
    }

    await Promise.all(chatsPromise);
    console.log("Single Chats Created");
    process.exit(0); // Changed to 0 for a successful exit
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Function to create group chats with random members
const createGroupChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];

    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const membersSet = new Set();

      while (membersSet.size < numMembers) {
        const randomIndex = Math.floor(Math.random() * users.length);
        membersSet.add(users[randomIndex]._id);
      }

      const members = Array.from(membersSet);

      chatsPromise.push(
        Chat.create({
          groupChat: true,
          name: faker.lorem.words(1),
          members,
          creator: members[0],
        })
      );
    }

    await Promise.all(chatsPromise);
    console.log("Group Chats Created:", numChats);
    process.exit(0); // Changed to 0 for a successful exit
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Function to create random messages in random chats
const createMessage = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");
    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomChatIndex = Math.floor(Math.random() * chats.length);
      const randomUserIndex = Math.floor(Math.random() * users.length);
      messagesPromise.push(
        Message.create({
          chat: chats[randomChatIndex]._id,
          sender: users[randomUserIndex]._id, // Use sender instead of user
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagesPromise);
    console.log("Messages Created:", numMessages);
    process.exit(0); // Changed to 0 for a successful exit
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Function to create messages in a specific chat
const createMessageInAChat = async (chatId, numMessages) => {
  try {
    const users = await User.find().select("_id");
    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      messagesPromise.push(
        Message.create({
          chat: chatId,
          sender: users[randomUserIndex]._id, // Use sender instead of user
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagesPromise);
    console.log(`Messages Created in Chat ${chatId}:`, numMessages);
    process.exit(0); // Changed to 0 for a successful exit
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export {
  createGroupChats,
  createMessage,
  createMessageInAChat,
  createSingleChats,
};
