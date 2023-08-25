import type { NextApiRequest, NextApiResponse } from "next";
const Comment = require("../../../db/models/comment");
const sequelize = require("../../../db/config");

interface iComment {
  publishedItemId: number;
  text: string;
}
async function getComments(id: number) {
  try {
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
    const res = await sequelize.query(
      ` INSERT INTO comment (id, text, date, publishedItemId) VALUES (DEFAULT,$text,DEFAULT,$publishedItemId);`,
      {
        bind: {
          text: comment.text,
          publishedItemId: comment.publishedItemId,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );
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
      const data = { ...req.body, publishedItemId: Number(id) };
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
