import type { NextApiRequest, NextApiResponse } from "next";
const StickerPack = require("../../../../../db/models/stickerPack");
const sequelize = require("../../../../../db/config");

async function sortStickerPacksAZ(id: number) {
  try {
    const res = await StickerPack.findAll({
      where: {
        userId: id,
      },
      order: [["name", "ASC"]],
      raw: true,
    });
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

async function sortStickerPacksZA(id: number) {
  try {
    const res = await StickerPack.findAll({
      where: {
        userId: id,
      },
      order: [["name", "DESC"]],
      raw: true,
    });
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

async function sortStickerPacksDateNew(id: number) {
  try {
    const res = await StickerPack.findAll({
      where: {
        userId: id,
      },
      order: [["date", "DESC"]],
      raw: true,
    });
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

async function sortStickerPacksDateOld(id: number) {
  try {
    const res = await StickerPack.findAll({
      where: {
        userId: id,
      },
      order: [["date", "ASC"]],
      raw: true,
    });
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof StickerPack>
) {
  try {
    const type = req.query.type;
    const id = req.query.id;
    if (type === "AZ") {
      const data = await sortStickerPacksAZ(id as any);
      res.status(200).json(data);
    } else if (type === "ZA") {
      const data = await sortStickerPacksZA(id as any);
      res.status(200).json(data);
    } else if (type === "new") {
      const data = await sortStickerPacksDateNew(id as any);
      res.status(200).json(data);
    } else if (type === "old") {
      const data = await sortStickerPacksDateOld(id as any);
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
