import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import axios from "axios";

interface IStickerPack {
  id: number;
}

export const getStickerPacksByUserId = async (id: number) => {
  return axios
    .get<IStickerPack[]>("/api/stickerpack/user/" + id)
    .then((res) => res.data)
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
