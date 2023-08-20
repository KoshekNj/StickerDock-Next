import type { NextApiRequest, NextApiResponse } from "next";
const PublishedItem = require("../../../db/models/publishedItem");
const sequelize = require("../../../db/config");

interface iPublishedItem {
  userId: number;
  imageId?: number;
  stickerPackId?: number;
}

export async function createPublishedItem(publishedItem: iPublishedItem) {
  try {
    const res = await PublishedItem.create(publishedItem);
    return res;
  } catch (error) {
    return error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof PublishedItem>
) {
  try {
    const item = req.body;
    const data = await createPublishedItem(item);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
