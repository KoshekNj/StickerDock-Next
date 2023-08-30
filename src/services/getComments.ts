import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import axios from "axios";

interface IComments {
  id: number;
  userId: number;
  publisheditemid: number;
  text: string;
  date: string;
  profilePicUrl: string;
  username: string;
}

export const getComments = async (id: number) => {
  return axios
    .get<IComments[]>("/api/comment/" + id)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

type ICommentsFullQueryOptions = UseQueryOptions<
  IComments[],
  unknown,
  IComments[],
  string[]
>;

const defaultOptions: ICommentsFullQueryOptions = {
  refetchOnWindowFocus: false,
};

export function useGetComments(id: number) {
  return useQuery(
    ["comments", String(id)],
    () => getComments(id),
    defaultOptions
  );
}
