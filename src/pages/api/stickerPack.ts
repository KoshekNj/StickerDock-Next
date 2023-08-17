import type { NextApiRequest, NextApiResponse } from "next";
import { getStickerByStickerPackId } from "./sticker";
const StickerPack = require("../../db/models/stickerPack");
import { createSticker, iSticker } from "./sticker";
import { createPublishedItem } from "./publishedItem";
const sequelize = require("../../db/config");

export interface iStickerPack {
  name: string;
  userId: number;
  labelUrl: string;
}

export interface iStickerPackFull {
  id: number;
  name: string;
  userId: number;
  labelUrl: string;
}
async function getStickerPacks(id: number) {
  try {
    const res = await StickerPack.findAll({ where: { userId: id } });
    return res;
  } catch (err) {
    return err;
  }
}

async function getStickerPackById(id: number) {
  try {
    const res = await StickerPack.findOne({
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

async function getStickerPackByUserId(id: number) {
  try {
    const stikcerPacks = await StickerPack.findAll({
      where: {
        userId: id,
      },
      raw: true,
    });

    let res = stikcerPacks.map((stickerPack: iStickerPackFull) => {
      let stickers = getStickerByStickerPackId(stickerPack.id);
      return { ...stickerPack, stickers: stickers };
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function createStickerPack(
  stickerPack: iStickerPack,
  stickers: string[]
) {
  try {
    const res = await StickerPack.create(stickerPack);
    const stickerPackId = res.id;
    stickers?.map(async (imageUrl) => {
      await createSticker({ stickerPackId, imageUrl });
    });
    createPublishedItem(stickerPack.userId, res.id);
    return res.id;
  } catch (error) {
    return error;
  }
}

async function sortStickerPacksAZ(id: number) {
  try {
    const res = await StickerPack.findAll({
      where: {
        userId: id,
      },
      order: [["name", "ASC"]],
      raw: true,
    });
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

async function sortStickerPacksZA(id: number) {
  try {
    const res = await StickerPack.findAll({
      where: {
        userId: id,
      },
      order: [["name", "DESC"]],
      raw: true,
    });
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

async function sortStickerPacksDateNew(id: number) {
  try {
    const res = await StickerPack.findAll({
      where: {
        userId: id,
      },
      order: [["date", "DESC"]],
      raw: true,
    });
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

async function sortStickerPacksDateOld(id: number) {
  try {
    const res = await StickerPack.findAll({
      where: {
        userId: id,
      },
      order: [["date", "ASC"]],
      raw: true,
    });
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

async function deleteStickerPack(id: number): Promise<any> {
  try {
    const res = await StickerPack.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
}

async function searchStickerPackByTags(id: number, tag?: string) {
  try {
    if (tag) {
      const stickerPackTag = await sequelize.query(
        `SELECT * FROM  stickerpack INNER JOIN stickerpacktags ON stickerpack.id=stickerpacktags.stickerPackId INNER JOIN tag ON stickerpacktags.tagId=tag.id WHERE tag.name=:name`,
        {
          replacements: { name: name },
          type: sequelize.QueryTypes.SELECT,
        }
      );
      return stickerPackTag;
    } else {
      const contact = await StickerPack.findAll();
      return contact;
    }
  } catch (err) {
    return err;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof StickerPack>
) {
  try {
    const search = await searchStickerPackByTags(1);
    res.status(200).json(search);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
