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

export const getStickerPacksByUserId = async (
  id: number,
  name?: string,
  type?: string
) => {
  return axios
    .get<IStickerPack[]>(
      "/api/stickerpack/user/" + id + "/?name=" + name + "&type=" + type
    )
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

export function useGetStickerPacksByUserId(
  id: number,
  name?: string,
  type?: string
) {
  return useQuery(
    ["packs", String(id), String(name), String(type)],
    () => getStickerPacksByUserId(id, name, type),
    defaultOptions
  );
}
