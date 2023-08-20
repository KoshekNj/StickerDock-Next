import type { NextApiRequest, NextApiResponse } from "next";
const PublishedItem = require("../../db/models/publishedItem");
const sequelize = require("../../db/config");

async function getPublishedItemFollow(id: number) {
  try {
    const res = await sequelize.query(
      `SELECT * FROM bla.publishedItem INNER JOIN bla.follower ON bla.publisheditem.userId=bla.follower.followId WHERE bla.follower.userId=:userId ORDER BY bla.publishedItem.date DESC LIMIT 50; `,
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
