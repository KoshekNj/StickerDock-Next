import type { NextApiRequest, NextApiResponse } from "next";
const StickerPack = require("../../db/models/stickerPack");

async function getStickerPacks() {
  try {
    const res = await StickerPack.findAll();
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
    const result = await getStickerPacks();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}