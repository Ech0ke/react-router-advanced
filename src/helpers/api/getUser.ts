import axios, { AxiosRequestConfig } from "axios";
import { GET_USERS } from "../../../api/urls/apiUrls";
import { UserType } from "./../../types/userType";

export async function getUser(
  userId: string,
  options: AxiosRequestConfig
): Promise<UserType> {
  const res = await axios.get(`${GET_USERS}/${userId}`, options);
  return res.data;
}
