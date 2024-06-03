export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Smith",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ashirbad Smith",
    _id: "3",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Smith",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John Smith",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "Ashirbad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "This is a test Message",
    _id: "asdfas",
    sender: {
      _id: "user._id",
      name: "Ashirbad",
    },
    chat: "chatId",
    createdAt: "2024-06-02T15:00:00.000Z",
  },
  {
    attachments: [
      {
        public_id: "Ashirbad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "This is a test Message",
    _id: "vavjav",
    sender: {
      _id: "sdfghjk",
      name: "Akash",
    },
    chat: "chatId",
    createdAt: "2024-06-02T15:00:00.000Z",
  },
];
