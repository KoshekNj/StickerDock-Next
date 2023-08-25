import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import axios from "axios";

interface IPublishedItem {
  id: number;
  date: string;
  likes: number;
  public: boolean;
  userId: number;
  imageId?: number;
  imageUrl: string;
}

export const getPublishedItemsByUserId = async (id: number) => {
  return axios
    .get<IPublishedItem[]>("/api/publisheditem/user/" + id)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

type IPublishedItemsFullQueryOptions = UseQueryOptions<
  IPublishedItem[],
  unknown,
  IPublishedItem[],
  string[]
>;

const defaultOptions: IPublishedItemsFullQueryOptions = {
  refetchOnWindowFocus: false,
};

export function useGetPublishedItemsByUserId(id: number) {
  return useQuery(
    ["userposts", String(id)],
    () => getPublishedItemsByUserId(id),
    defaultOptions
  );
}
