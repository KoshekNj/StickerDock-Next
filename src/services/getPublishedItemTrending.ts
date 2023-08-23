import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import axios from "axios";

interface IPublishedItem {
  id: number;
  date: string;
  likes: number;
  public: boolean;
  userId: number;
  imageId?: number;
  stickerPackId: number;
  imageUrl: string;
}

export const getPublishedItemTrending = async () => {
  return axios
    .get<IPublishedItem>("/api/publisheditem/trending")
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

type IPublishedItemFullQueryOptions = UseQueryOptions<
  IPublishedItem,
  unknown,
  IPublishedItem,
  string[]
>;

const defaultOptions: IPublishedItemFullQueryOptions = {
  refetchOnWindowFocus: false,
};

export function usegetPublishedItemTrending() {
  return useQuery(
    ["publisheditem", String()],
    () => getPublishedItemTrending(),
    defaultOptions
  );
}
