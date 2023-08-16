import type { NextApiRequest, NextApiResponse } from "next";
const StickerPack = require("../../db/models/stickerPack");

interface iStickerPack {
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

async function createStickerPack(stickerPack: iStickerPack) {
  try {
    const res = await StickerPack.create(stickerPack);
    return res;
  } catch (error) {
    return error;
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof StickerPack>
) {
  try {
    res.status(200).json("test");
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
