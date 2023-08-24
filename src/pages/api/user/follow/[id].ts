import type { NextApiRequest, NextApiResponse } from "next";
const Follower = require("../../../../db/models/follower");
const sequelize = require("../../../../db/config");

interface iFollower {
  userId: number;
  followId: number;
}

async function getFollowerById(id: number) {
  try {
    const follower = await sequelize.query(
      `SELECT * FROM follower INNER JOIN user ON follower.followId=user.id WHERE follower.userId=:userId `,
      {
        replacements: { userId: id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return follower;
  } catch (err) {
    return err;
  }
}

async function createFollower(userId: number, followId: number) {
  try {
    const res = await Follower.create(userId, followId);
    return res;
  } catch (error) {
    return error;
  }
}

async function deleteFollower(userId: number, followId: number) {
  try {
    const result = await Follower.destroy({
      where: {
        userId: userId,
        followId: followId,
      },
    });
    return result;
  } catch (err) {
    return err;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof Follower>
) {
  try {
    if (req.method === "POST") {
      const userId = req.query.userId;
      const followId = req.query.id;
      const response = await createFollower(userId as any, followId as any);
      return res.status(200).json(response);
    } else if (req.method === "GET") {
      const userId = req.query.id;
      const response = await getFollowerById(userId as any);
      return res.status(200).json(response);
    } else if (req.method === "DELETE") {
      const userId = req.query.userId;
      const followId = req.query.id;
      const response = await deleteFollower(userId as any, followId as any);
      return res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
