import type { NextApiRequest, NextApiResponse } from "next";
const Sticker = require("../../../db/models/sticker");

export interface iSticker {
  stickerPackId: number;
  imageUrl: string;
}

export async function getStickerByStickerPackId(id: number) {
  try {
    const res = await Sticker.findAll({
      where: {
        stickerPackId: id,
      },
      raw: true,
    });
    return res;
  } catch (err) {
    return err;
  }
}

async function deleteStickers(id: number) {
  try {
    const res = await Sticker.destroyAll({
      where: {
        stickerPackid: id,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof Sticker>
) {
  try {
    if ((req.method = "GET")) {
      const stickerId = req.query.id;
      const response = await getStickerByStickerPackId(stickerId as any);
      return res.status(200).json(response);
    } else if ((req.method = "DELETE")) {
      const stickerId = req.query.id;
      const response = await deleteStickers(stickerId as any);
      return res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
