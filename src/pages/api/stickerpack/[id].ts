import type { NextApiRequest, NextApiResponse } from "next";
import { getStickerByStickerPackId } from "../sticker/[id]";
import { getTagsByPackId } from "../stickerpacktag/stickerpack/[id]";
const StickerPack = require("../../../db/models/stickerPack");
const sequelize = require("../../../db/config");

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

async function getStickerPackById(id: number) {
  try {
    const res = await StickerPack.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    let stickers = await getStickerByStickerPackId(res.id);
    let tags = await getTagsByPackId(res.id);
    return { ...res, stickers: stickers, tags: tags };
  } catch (err) {
    return err;
  }
}

async function deleteStickerPack(id: number) {
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

async function searchStickerPackByTags(id: number, tag: string) {
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
    const stickerPackId = req.query.id;
    const tag = req.query.tag;
    if ((req.method = "GET") && !tag) {
      const response = await getStickerPackById(stickerPackId as any);
      return res.status(200).json(response);
    } else if ((req.method = "DELETE")) {
      const response = await deleteStickerPack(stickerPackId as any);
      return res.status(200).json(response);
    } else {
      const response = await searchStickerPackByTags(
        stickerPackId as any,
        tag as any
      );
      return res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
