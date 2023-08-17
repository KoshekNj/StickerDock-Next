import type { NextApiRequest, NextApiResponse } from "next";
const PublishedItem = require("../../db/models/publishedItem");
const sequelize = require("../../db/config");

interface iPublishedItem {
  userId: number;
  imageId: number;
  stickerPackId: number;
  date: string;
  likes: number;
  public: boolean;
}
async function getPublishedItems() {
  try {
    const res = await PublishedItem.findAll();
    return res;
  } catch (err) {
    return err;
  }
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

async function getPublishedItemTrending() {
  try {
    const res = await sequelize.query(
      `SELECT * FROM publishedItem WHERE (now()-date)<7 ORDER BY publisheditem.likes DESC LIMIT 50 `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

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

async function getPublishedItemsByUserId(id: number) {
  try {
    const res = await PublishedItem.findAll({ where: { userId: id } });
    return res;
  } catch (err) {
    return err;
  }
}

export async function createPublishedItem(userId: number, id: number) {
  try {
    const res = await PublishedItem.create(userId, id);
    return res;
  } catch (error) {
    return error;
  }
}

async function deletePublishedItem(id: number) {
  try {
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
    const result = await getPublishedItems();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
