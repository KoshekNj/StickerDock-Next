import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import axios from "axios";

interface IStickerPack {
  id: number;
  name: string;
  userId: number;
  labelUrl: string;
  stickers: [];
  tags: [];
}

export const getStickerPackById = async (id: number) => {
  return axios
    .get<IStickerPack>("/api/stickerpack/" + id)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

type IStickerPackFullQueryOptions = UseQueryOptions<
  IStickerPack,
  unknown,
  IStickerPack,
  string[]
>;

const defaultOptions: IStickerPackFullQueryOptions = {
  refetchOnWindowFocus: false,
};

export function useGetStickerPackyById(id: number) {
  return useQuery(
    ["pack", String(id)],
    () => getStickerPackById(id),
    defaultOptions
  );
}
