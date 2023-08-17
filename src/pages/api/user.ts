import type { NextApiRequest, NextApiResponse } from "next";
const User = require("../../db/models/user");

interface iUser {
  email: string;
  username: string;
  password: string;
  description: string;
  profilePicUrl: string;
  dateJoined: string;
}
async function getUsers() {
  try {
    const res = await User.findAll();
    return res;
  } catch (err) {
    return err;
  }
}

async function logInUser(email: string, password: string) {
  try {
    const user = await User.findOne({ where: { email: email } });
    if ((user.password = password)) {
      return user;
    } else {
      return "Not authorized";
    }
  } catch (err) {
    return err;
  }
}

async function signUpUser(user: iUser) {
  try {
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) {
      return "User with this email already exists";
    } else {
      createUser(user);
    }
  } catch (err) {
    return err;
  }
}

async function getUserById(id: number) {
  try {
    const res = await User.findOne({
      where: {
        id: id,
      },
      raw: true,
    });
    return res;
  } catch (err) {
    return err;
  }
}

async function createUser(user: iUser) {
  try {
    const res = await User.create(user);
    return res;
  } catch (error) {
    return error;
  }
}

async function deleteUser(id: number) {
  try {
    const res = await User.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof User>
) {
  try {
    res.status(200).json("test");
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
