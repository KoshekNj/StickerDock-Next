import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface iPublishedItem {
  id: number;
  value: number;
}

export const updatePublishedItem = async (payload: iPublishedItem) => {
  return await axios
    .put("/api/publisheditem/" + payload.id, {
      value: payload.value,
    })
    .then((res) => {
      return res.data;
    });
};

export const useUpdatePublishedItem = () =>
  useMutation((data: iPublishedItem) => updatePublishedItem(data));
