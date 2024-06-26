import { faker } from "@faker-js/faker";
import { User } from "../models/user.js";

const createUser = async (numUser) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUser; i++) {
      const tempUser = User.create({
        name: faker.name.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "Password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }

    await Promise.all(usersPromise);
    console.log("Users Created:", numUser);
    process.exit(0); // Changed to 0 for a successful exit
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { createUser };
