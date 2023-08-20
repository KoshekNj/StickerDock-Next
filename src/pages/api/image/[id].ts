import type { NextApiRequest, NextApiResponse } from "next";
const Image = require("../../../db/models/image");

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

export async function deleteImage(id: number) {
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
    if ((req.method = "GET")) {
      const imageId = req.query.id;
      const response = await getImageById(imageId as any);
      return res.status(200).json(response);
    } else if ((req.method = "DELETE")) {
      const imageId = req.query.id;
      const response = await deleteImage(imageId as any);
      return res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
