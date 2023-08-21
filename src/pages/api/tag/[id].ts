import type { NextApiRequest, NextApiResponse } from "next";
const Tag = require("../../../db/models/tag");

async function getTagById(id: number) {
  try {
    const res = await Tag.findOne({
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

async function deleteTag(id: number) {
  try {
    const res = await Tag.destroy({
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
  res: NextApiResponse<typeof Tag>
) {
  try {
    const tagId = req.query.id;
    if ((req.method = "GET")) {
      const response = await getTagById(tagId as any);
      return res.status(200).json(response);
    } else if ((req.method = "DELETE")) {
      const response = await deleteTag(tagId as any);
      return res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
