import type { NextApiRequest, NextApiResponse } from "next";
const Comment = require("../../../db/models/comment");

interface iComment {
  publisheditemid: number;
  text: string;
  date: string;
}
async function getComments(id: number) {
  try {
    console.log("in", id);
    const res = await Comment.findAll({
      where: { publishedItemId: id },
      raw: true,
    });
    return res;
  } catch (err) {
    return err;
  }
}

async function createComment(comment: iComment) {
  try {
    const res = await Comment.create(comment);
    return res;
  } catch (error) {
    return error;
  }
}

async function deleteComment(id: number) {
  try {
    const res = await Comment.destroy({
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
  res: NextApiResponse<typeof Comment>
) {
  try {
    const id = req.query.id;

    if (req.method === "POST") {
      const data = { ...req.body, publishedItemId: id };
      const response = await createComment(data);
      return res.status(200).json(response);
    } else if (req.method === "GET") {
      const response = await getComments(id as any);
      return res.status(200).json(response);
    } else if (req.method === "DELETE") {
      const response = await deleteComment(id as any);
      return res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
