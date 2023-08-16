import type { NextApiRequest, NextApiResponse } from "next";
const Tag = require("../../db/models/tag");

interface iTag {
  name: string;
}
async function getTags() {
  try {
    const res = await Tag.findAll();
    return res;
  } catch (err) {
    return err;
  }
}

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

async function createTag(tag: iTag) {
  try {
    const res = await Tag.create(tag);
    return res;
  } catch (error) {
    return error;
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
    const result = await getTags();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
