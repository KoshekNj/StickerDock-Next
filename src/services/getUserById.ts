import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import axios from "axios";
import { iUserFull } from "pages/api/user/[id]";

export const getUserById = async (id: number) => {
  return axios
    .get<iUserFull>("/api/user/" + id)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

type iUserFullQueryOptions = UseQueryOptions<
  iUserFull,
  unknown,
  iUserFull,
  string[]
>;

const defaultOptions: iUserFullQueryOptions = {
  refetchOnWindowFocus: false,
};

export function useGetUserById(id: number) {
  return useQuery(["user", String(id)], () => getUserById(id), defaultOptions);
}
