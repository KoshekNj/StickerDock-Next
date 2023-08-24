import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface IUser {
  email: string;
  password: string;
  username: string;
}

export const signUpUser = async (payload: IUser) => {
  return await axios
    .post("api/user/signup", {
      payload,
    })
    .then((res) => {
      return res.data;
    });
};

export const useSignUpUser = () =>
  useMutation((data: IUser) => signUpUser(data));
