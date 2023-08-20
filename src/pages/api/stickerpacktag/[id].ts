import type { NextApiRequest, NextApiResponse } from "next";
const StickerPackTag = require("../../../db/models/tag");
const sequelize = require("../../../db/config");

interface iStickerPackTag {
  stickerPackId: number;
  tagId: number;
}

async function getStickerPackTagById(id: number) {
  try {
    const stickerPackTag = await sequelize.query(
      `SELECT * FROM stickerPackTag INNER JOIN tag ON stickerPackTag.tagId=tag.id WHERE stickerPackTag.contactId=:contactId `,
      {
        replacements: { tagId: id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return stickerPackTag;
  } catch (err) {
    return err;
  }
}

async function deleteStickerPackTag(stickerPackId: number, tagId: number) {
  try {
    const result = await StickerPackTag.destroy({
      where: {
        stickerPackId: stickerPackId,
        tagId: tagId,
      },
    });
    return result;
  } catch (err) {
    return err;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof StickerPackTag>
) {
  try {
    const tagId = req.query.id;
    if ((req.method = "GET")) {
      const response = await getStickerPackTagById(tagId as any);
      return res.status(200).json(response);
    } else if ((req.method = "DELETE")) {
      const stickerPackId = req.body.stickerPackId;
      const response = await deleteStickerPackTag(tagId as any, stickerPackId);
      return res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
