import type { NextApiRequest, NextApiResponse } from "next";
const StickerPackTag = require("../../../db/models/tag");
const sequelize = require("../../../db/config");
interface iStickerPackTag {
  stickerPackId: number;
  tagId: number;
}

export async function createStickerPackTag(stickerPackTag: iStickerPackTag) {
  try {
    const res = await sequelize.query(
      ` INSERT INTO stickerpacktags (tagId,stickerPackId) VALUES ($tagId,$stickerPackId );`,
      {
        bind: {
          tagId: stickerPackTag.tagId,
          stickerPackId: stickerPackTag.stickerPackId,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );
    return res;
  } catch (error) {
    return error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof StickerPackTag>
) {
  try {
    const stickerPackTag = req.body;
    const data = await createStickerPackTag(stickerPackTag);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
