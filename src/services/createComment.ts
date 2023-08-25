import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface iComment {
  id: number;
  userId: number;
  text: string;
}

export const createComment = async (payload: iComment) => {
  return await axios
    .post("/api/comment/" + payload.id, {
      userId: payload.userId,
      text: payload.text,
    })
    .then((res) => {
      return res.data;
    });
};

export const useCreateComment = () =>
  useMutation((data: iComment) => createComment(data));
