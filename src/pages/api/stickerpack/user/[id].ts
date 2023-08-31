import type { NextApiRequest, NextApiResponse } from "next";
import { getStickerByStickerPackId } from "pages/api/sticker/[id]";
import { getTagsByPackId } from "pages/api/stickerpacktag/stickerpack/[id]";
const StickerPack = require("../../../../db/models/stickerPack");
const sequelize = require("../../../../db/config");
const { Op } = require("sequelize");

export interface iStickerPackFull {
  id: number;
  name: string;
  userId: number;
  labelUrl: string;
}

async function getStickerPackByUserId(
  id: number,
  name?: string,
  type?: string
) {
  try {
    if (name !== "" && name !== undefined) {
      const stickerPacks = await StickerPack.findAll({
        attributes: ["id"],
        where: {
          userId: id,
          name: { [Op.like]: `${name}%` },
        },
        raw: true,
      });
      return stickerPacks;
    } else if (type == "asc") {
      console.log("asc");
      const res = await StickerPack.findAll({
        where: {
          userId: id,
        },
        order: [["name", "ASC"]],
      });
      return res;
    } else if (type === "desc") {
      const res = await StickerPack.findAll({
        where: {
          userId: id,
        },
        order: [["name", "DESC"]],
      });

      return res;
    } else if (type === "new") {
      const res = await StickerPack.findAll({
        where: {
          userId: id,
        },
        order: [["date", "DESC"]],
      });

      return res;
    } else if (type === "old") {
      const res = await StickerPack.findAll({
        where: {
          userId: id,
        },
        order: [["date", "ASC"]],
      });
      return res;
    } else {
      const stickerPacks = await StickerPack.findAll({
        attributes: ["id"],
        where: {
          userId: id,
        },
        raw: true,
      });
      return stickerPacks;
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
    const userId = req.query.id;
    const name = req.query.name;
    const type = req.query.type;
    const search = await getStickerPackByUserId(
      userId as any,
      name as string,
      type as string
    );
    res.status(200).json(search);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
