import type { NextApiRequest, NextApiResponse } from "next";
import { createPublishedItem } from "../publisheditem/index";
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
    console.log(image.payload);
    const data = await createImage({
      userId: image.payload.userId,
      imageUrl: image.payload.imageUrl,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
