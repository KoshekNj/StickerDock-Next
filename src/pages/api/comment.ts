import type { NextApiRequest, NextApiResponse } from "next";
const Comment = require("../../db/models/comment");

interface iComment {
  publisheditemid: number;
  text: string;
  date: string;
}
async function getComments(id: number) {
  try {
    const res = await Comment.findAll({ where: { publisheditemid: id } });
    return res;
  } catch (err) {
    return err;
  }
}

async function getCommentById(id: number) {
  try {
    const res = await Comment.findOne({
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
    res.status(200).json("test");
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
