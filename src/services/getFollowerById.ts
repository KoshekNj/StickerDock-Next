import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import axios from "axios";

interface IFollower {
  id: number;
  publisheditemid: number;
  text: string;
  date: string;
}

export const getFollowers = async (userId: number, followerId?: number) => {
  return axios
    .get<IFollower[]>("/api/user/follow/" + userId + "/?followid=" + followerId)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

type IFollowersFullQueryOptions = UseQueryOptions<
  IFollower[],
  unknown,
  IFollower[],
  string[]
>;

const defaultOptions: IFollowersFullQueryOptions = {
  refetchOnWindowFocus: false,
};

export function useGetFollowers(
  userId: number,
  followerId?: number,
  options?: IFollowersFullQueryOptions
) {
  return useQuery(
    ["followers", String(userId)],
    () => getFollowers(userId, followerId),
    { ...defaultOptions, ...options }
  );
}
