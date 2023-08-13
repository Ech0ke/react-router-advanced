import axios, { AxiosRequestConfig } from "axios";
import { GET_USERS } from "../../../api/urls/apiUrls";
import { UserType } from "../../types/userType";

export async function getUsers(
  options: AxiosRequestConfig
): Promise<UserType[]> {
  const res = await axios.get(GET_USERS, options);
  return res.data;
}
