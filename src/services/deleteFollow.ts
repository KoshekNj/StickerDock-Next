import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const deleteFollow = async (userId: number, followerId?: number) => {
  return await axios
    .delete("/api/user/follow/" + userId + "/?followid=" + followerId)
    .then((res) => {
      return res.data;
    });
};

export const useDeleteFollow = () =>
  useMutation(
    ({ userId, followerId }: { userId: number; followerId: number }) =>
      deleteFollow(userId, followerId)
  );
