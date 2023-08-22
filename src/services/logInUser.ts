import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface IUser {
  email: string;
  password: string;
}

export const logInUser = async (payload: IUser) => {
  return await axios
    .post("api/user/login", {
      ...payload,
    })
    .then((res) => {
      return res.data;
    });
};

export const useLogInUser = () => useMutation((data: IUser) => logInUser(data));
