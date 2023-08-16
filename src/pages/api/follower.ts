import type { NextApiRequest, NextApiResponse } from "next";
const Follower = require("../../db/models/tag");
const sequelize = require("../../db/config");

interface iFollower {
  userId: number;
  followId: number;
}
async function getAllfollowers() {
  try {
    const res = await Follower.findAll();
    return res;
  } catch (err) {
    return err;
  }
}

async function getFollowerById(id: number) {
  try {
    const follower = await sequelize.query(
      `SELECT * FROM follower INNER JOIN tag ON follower.tagId=tag.id WHERE follower.contactId=:contactId `,
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

async function createFollower(follower: iFollower) {
  try {
    const res = await Follower.create(follower);
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
    res.status(200).json("test");
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
