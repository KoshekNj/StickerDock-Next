import type { NextApiRequest, NextApiResponse } from "next";
const User = require("../../../db/models/user");

interface iUser {
  email: string;
  username: string;
  password: string;
  description: string;
  profilePicUrl: string;
  dateJoined: string;
}

export interface iUserFull {
  id: number;
  email: string;
  username: string;
  password: string;
  description: string;
  profilePicUrl: string;
  dateJoined: string;
}

async function signUpUser(user: iUser) {
  try {
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) {
      return "User with this email already exists";
    } else {
      const newUser = await createUser(user);
      return newUser;
    }
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof User>
) {
  try {
    const data = req.body;
    const user = signUpUser(data);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
