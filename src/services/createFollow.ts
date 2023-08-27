import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const createFollow = async (userId: number, followerId?: number) => {
  return await axios
    .post("/api/user/follow/" + userId + "/?followid=" + followerId)
    .then((res) => {
      return res.data;
    });
};

export const useCreateFollow = () =>
  useMutation(
    ({ userId, followerId }: { userId: number; followerId: number }) =>
      createFollow(userId, followerId)
  );
