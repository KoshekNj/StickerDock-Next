import type { NextApiRequest, NextApiResponse } from "next";
import { createSticker } from "../sticker";
import { createPublishedItem } from "../publisheditem";
import { createTag } from "../tag";
import { createStickerPackTag } from "../stickerpacktag";

const StickerPack = require("../../../db/models/stickerPack");

export interface iStickerPack {
  name: string;
  userId: number;
  labelUrl: string;
}

export async function createStickerPack(
  stickerPack: iStickerPack,
  stickers: string[],
  tags: string[]
) {
  try {
    const res = await StickerPack.create(stickerPack);
    const stickerPackId = res.id;
    stickers?.map(async (imageUrl) => {
      await createSticker({ stickerPackId: stickerPackId, imageUrl: imageUrl });
    });
    tags?.map(async (tag) => {
      let newTag = await createTag({ name: tag });
      await createStickerPackTag({ stickerPackId: res.id, tagId: newTag.id });
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
    const data = req.body.payload;

    const stickerPack = {
      userId: data.userId,
      labelUrl: data.labelUrl,
      name: data.name,
    };

    const stickers = data.stickers;

    const tags = data.tags.split(",");

    const newStickerPack = await createStickerPack(stickerPack, stickers, tags);
    res.status(200).json(newStickerPack);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}