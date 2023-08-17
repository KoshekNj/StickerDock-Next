import type { NextApiRequest, NextApiResponse } from "next";
import { createPublishedItem } from "./publishedItem";
const Image = require("../../db/models/image");

export interface iImage {
  imageUrl: string;
  userId: number;
}

export interface iImageFull {
  id: number;
  imageUrl: string;
}
async function getImages() {
  try {
    const res = await Image.findAll();
    return res;
  } catch (err) {
    return err;
  }
}

async function getImageById(id: number) {
  try {
    const res = await Image.findOne({
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

export async function createImage(image: iImage) {
  try {
    const res = await Image.create(image);
    createPublishedItem(image.userId, res.id);
    return res.id;
  } catch (error) {
    return error;
  }
}

async function deleteImage(id: number) {
  try {
    const res = await Image.destroy({
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
  res: NextApiResponse<typeof Image>
) {
  try {
    const result = await getImages();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
