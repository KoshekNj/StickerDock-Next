import type { NextApiRequest, NextApiResponse } from "next";
import { createPublishedItem } from "../publishedItem";
const Image = require("../../../db/models/image");

export interface iImage {
  imageUrl: string;
  userId: number;
}

export async function createImage(image: iImage) {
  try {
    const res = await Image.create(image);
    const item = { userId: image.userId, imageId: res.id };
    await createPublishedItem(item);
    return res.id;
  } catch (error) {
    return error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof Image>
) {
  try {
    const image = req.body;
    const data = await createImage(image);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
