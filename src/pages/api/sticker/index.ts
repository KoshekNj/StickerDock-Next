import type { NextApiRequest, NextApiResponse } from "next";
const Sticker = require("../../../db/models/sticker");

export interface iSticker {
  stickerPackId: number;
  imageUrl: string;
}

export async function createSticker(sticker: iSticker) {
  try {
    const res = await Sticker.create(sticker);
    return res;
  } catch (error) {
    return error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof Sticker>
) {
  try {
    const sticker = req.body;
    const data = await createSticker(sticker);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
