import type { NextApiRequest, NextApiResponse } from "next";
import { deleteImage } from "../image/[id]";
const PublishedItem = require("../../../db/models/publishedItem");
const sequelize = require("../../../db/config");

interface iPublishedItem {
  userId: number;
  imageId: number;
  stickerPackId: number;
  date: string;
  likes: number;
  public: boolean;
}

async function getPublishedItemById(id: number) {
  try {
    const res = await PublishedItem.findOne({
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

async function deletePublishedItem(id: number) {
  try {
    const deleteItem = await getPublishedItemById(id);
    if (deleteItem.imageId) {
      deleteImage(deleteItem.imageId);
    }
    const res = await PublishedItem.destroy({
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
  res: NextApiResponse<typeof PublishedItem>
) {
  try {
    if ((req.method = "GET")) {
      const itemId = req.query.id;
      const response = await getPublishedItemById(itemId as any);
      return res.status(200).json(response);
    } else if ((req.method = "DELETE")) {
      const itemId = req.query.id;
      const response = await deletePublishedItem(itemId as any);
      return res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
