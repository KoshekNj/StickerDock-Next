import type { NextApiRequest, NextApiResponse } from "next";
import { getStickerByStickerPackId } from "pages/api/sticker/[id]";
import { getTagsByPackId } from "pages/api/stickerpacktag/stickerpack/[id]";
const StickerPack = require("../../../../db/models/stickerPack");
const sequelize = require("../../../../db/config");

export interface iStickerPackFull {
  id: number;
  name: string;
  userId: number;
  labelUrl: string;
}

async function getStickerPackByUserId(id: number) {
  try {
    const stickerPacks = await StickerPack.findAll({
      where: {
        userId: id,
      },
      raw: true,
    });

    let stickers = getStickerByStickerPackId(stickerPacks.id);
    let tags = getTagsByPackId(stickerPacks.id);
    return stickerPacks;
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
    const search = await getStickerPackByUserId(userId as any);
    res.status(200).json(search);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
