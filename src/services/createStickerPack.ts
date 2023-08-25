import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface iStickerPack {
  name: string;
  userId: number;
  labelUrl: string;
  stickers: string[];
  tags: string[];
}

export const createStickerPack = async (payload: iStickerPack) => {
  return await axios
    .post("/api/stickerpack/", {
      payload,
    })
    .then((res) => {
      return res.data;
    });
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export const useCreateStickerPack = () =>
  useMutation((data: iStickerPack) => createStickerPack(data));
