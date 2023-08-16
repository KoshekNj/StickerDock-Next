import type { NextApiRequest, NextApiResponse } from "next";
const Sticker = require("../../db/models/sticker");

interface iSticker {
  stikcerPackId: number;
  imageUrl: string;
}
async function getStickers(id: number) {
  try {
    const res = await Sticker.findAll({ where: { stickerPackid: id } });
    return res;
  } catch (err) {
    return err;
  }
}

async function getStickerById(id: number) {
  try {
    const res = await Sticker.findOne({
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

async function createSticker(sticker: iSticker) {
  try {
    const res = await Sticker.create(sticker);
    return res;
  } catch (error) {
    return error;
  }
}

async function deleteStickers(id: number) {
  try {
    const res = await Sticker.destroy({
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
    res.status(200).json("test");
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
