import type { NextApiRequest, NextApiResponse } from "next";
const Tag = require("../../../db/models/tag");

interface iTag {
  name: string;
}

async function createTag(tag: iTag) {
  try {
    const res = await Tag.create(tag);
    return res;
  } catch (error) {
    return error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof Tag>
) {
  try {
    const tag = req.body;
    const data = await createTag(tag);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
