import type { NextApiRequest, NextApiResponse } from "next";
const PublishedItem = require("../../../../db/models/publishedItem");
const sequelize = require("../../../../db/config");

async function getPublishedItemFollow(id: number) {
  try {
    const res = await sequelize.query(
      `SELECT publisheditem.id, publisheditem.likes, follower.*, user.profilePicUrl,user.username, user.id AS userId, image.imageUrl FROM publisheditem INNER JOIN follower ON publisheditem.userId=follower.followId INNER JOIN user ON user.id=follower.followId INNER JOIN image ON publisheditem.imageId=image.id WHERE follower.userId=:userId ORDER BY publisheditem.date DESC LIMIT 50; `,
      {
        replacements: { userId: id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof PublishedItem>
) {
  try {
    const userId = req.query.id;
    const data = await getPublishedItemFollow(userId as any);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
