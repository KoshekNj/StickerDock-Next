import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const deleteUser = async (id: number) => {
  return await axios.delete("/api/user/" + id).then((res) => {
    return res.data;
  });
};

export const useDeleteUser = () => useMutation((id: number) => deleteUser(id));
