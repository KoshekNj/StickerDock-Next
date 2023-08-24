import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "next/dist/server/web/http";
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

async function updateUser(user: any, id: number) {
  try {
    const res = await User.update(user, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (err) {
    return err;
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
    const { id } = req.query;
    const userUpdate = req.body;
    if (req.method === "GET") {
      const user = await getUserById(id as any);
      return res.status(200).json(user);
    } else if (req.method === "PUT") {
      const user = await updateUser(userUpdate, id as any);
      return res.status(200).json(user);
    } else if (req.method === "DELTE") {
      const user = await deleteUser(id as any);
      return res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
