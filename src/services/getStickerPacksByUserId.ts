import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import axios from "axios";
import { getStickerPackById } from "./getStickerPackById";

interface IStickerPack {
  id: number;
  name: string;
  userId: number;
  labelUrl: string;
  stickers: [];
  tags: [];
}

export const getStickerPacksByUserId = async (id: number) => {
  return axios
    .get<IStickerPack[]>("/api/stickerpack/user/" + id)
    .then(async (res) => {
      let array: any = [];
      for (const stickerPack of res.data) {
        let data = await getStickerPackById(stickerPack.id);
        array.push(data);
      }

      return array;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

type IStickerPackFullQueryOptions = UseQueryOptions<
  IStickerPack[],
  unknown,
  IStickerPack[],
  string[]
>;

const defaultOptions: IStickerPackFullQueryOptions = {
  refetchOnWindowFocus: false,
};

export function useGetStickerPacksByUserId(id: number) {
  return useQuery(
    ["packs", String(id)],
    () => getStickerPacksByUserId(id),
    defaultOptions
  );
}
