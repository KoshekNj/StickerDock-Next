import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import axios from "axios";

interface IPublishedItem {
  id: number;
  userId: number;
  imageId: number;
  stickerPackId: number;
  date: string;
  likes: number;
  public: boolean;
  "image.id": number;
  imageUrl: string;
  username: string;
  profilePicUrl: string;
}

export const getPublishedItemById = async (id: number) => {
  return axios
    .get<IPublishedItem>("/api/publisheditem/" + id)
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

export function useGetPublishedItemById(id: number) {
  return useQuery(
    ["item", String(id)],
    () => getPublishedItemById(id),
    defaultOptions
  );
}
