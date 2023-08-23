import type { NextApiRequest, NextApiResponse } from "next";
const StickerPackTag = require("../../../../db/models/tag");
const sequelize = require("../../../../db/config");

export async function getTagsByPackId(id: number) {
  try {
    const stickerPackTag = await sequelize.query(
      `SELECT tag.name FROM stickerpacktags INNER JOIN tag ON stickerpacktags.tagId=tag.id WHERE stickerpacktags.stickerPackId=:stickerPackId`,
      {
        replacements: { stickerPackId: id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return stickerPackTag;
  } catch (err) {
    return err;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof StickerPackTag>
) {
  try {
    const stickerPackId = req.query.id;
    const data = await getTagsByPackId(stickerPackId as any);
    return data;
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
