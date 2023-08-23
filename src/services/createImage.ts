import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface iImage {
  userId: number;
  imageUrl: string;
}

export const createImage = async (payload: iImage) => {
  return await axios
    .post("api/image", {
      payload,
    })
    .then((res) => {
      return res.data;
    });
};

export const useCreateImage = () =>
  useMutation((data: iImage) => createImage(data));
