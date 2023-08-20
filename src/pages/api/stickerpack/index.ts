import type { NextApiRequest, NextApiResponse } from "next";
import { createSticker } from "../sticker";
import { createPublishedItem } from "../publishedItem";
const StickerPack = require("../../../db/models/stickerPack");

export interface iStickerPack {
  name: string;
  userId: number;
  labelUrl: string;
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

    const item = { userId: stickerPack.userId, stickerPackId: stickerPackId };
    await createPublishedItem(item);
    return res.id;
  } catch (error) {
    return error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof StickerPack>
) {
  try {
    const data = req.body;
    const stickerPack = await createStickerPack(
      data.stickerPack,
      data.stickers
    );
    res.status(200).json(stickerPack);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
