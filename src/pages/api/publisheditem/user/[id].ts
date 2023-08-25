import type { NextApiRequest, NextApiResponse } from "next";
const PublishedItem = require("../../../../db/models/publishedItem");
const Image = require("../../../../db/models/image");
const sequelize = require("../../../../db/config");

async function getPublishedItemsByUserId(id: number) {
  try {
    const res = await PublishedItem.findAll({
      include: Image,
      where: { userId: id },
    });
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
    const data = await getPublishedItemsByUserId(userId as any);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
