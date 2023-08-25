import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface IUser {
  id: number;
  profilePicUrl: string;
  description: string;
}

export const updateUser = async (payload: IUser) => {
  return await axios
    .put("/api/user/" + payload.id, {
      profilePicUrl: payload.profilePicUrl,
      description: payload.description,
    })
    .then((res) => {
      return res.data;
    });
};

export const useUpdateUser = () =>
  useMutation((data: IUser) => updateUser(data));
