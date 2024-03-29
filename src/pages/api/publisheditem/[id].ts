import type { NextApiRequest, NextApiResponse } from "next";
import { deleteImage } from "../image/[id]";
const PublishedItem = require("../../../db/models/publishedItem");
const sequelize = require("../../../db/config");
const Image = require("../../../db/models/image");
const User = require("../../../db/models/user");
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
    const res = await sequelize.query(
      `SELECT publisheditem.id, publisheditem.likes, image.imageUrl, user.username, user.id AS userId, user.profilePicUrl FROM publisheditem INNER JOIN image ON image.id=publisheditem.imageId INNER JOIN user ON publisheditem.userId=user.id WHERE publisheditem.id=:id`,
      {
        replacements: { id: id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return res[0];
  } catch (err) {
    return err;
  }
}

async function updatePublishedItem(id: number, value: number) {
  try {
    const res = await sequelize.query(
      `UPDATE publisheditem SET publisheditem.likes = likes+ :value WHERE publisheditem.id=:id;`,
      {
        replacements: { id: id, value: value },

        type: sequelize.QueryTypes.UPDATE,
      }
    );
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
    const itemId = req.query.id;
    if (req.method === "GET") {
      const response = await getPublishedItemById(itemId as any);
      return res.status(200).json(response);
    } else if (req.method === "DELETE") {
      const response = await deletePublishedItem(itemId as any);
      return res.status(200).json(response);
    } else if (req.method === "PUT") {
      const value = req.body.value;
      const response = await updatePublishedItem(
        itemId as any,
        value as number
      );
      return res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
