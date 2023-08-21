import type { NextApiRequest, NextApiResponse } from "next";
const User = require("../../../db/models/user");

export interface iUserFull {
  id: number;
  email: string;
  username: string;
  password: string;
  description: string;
  profilePicUrl: string;
  dateJoined: string;
}

async function logInUser(email: string, password: string) {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user.password === password) {
      return user;
    } else {
      return "Not authorized";
    }
  } catch (err) {
    return err;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof User>
) {
  try {
    const { userInfo } = req.body;
    const user = await logInUser(userInfo.email, userInfo.password);
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
