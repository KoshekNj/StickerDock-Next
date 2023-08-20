import type { NextApiRequest, NextApiResponse } from "next";
import { getStickerByStickerPackId } from "pages/api/sticker/[id]";
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
