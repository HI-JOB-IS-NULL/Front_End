import axios from "axios";
import { ServerIP } from "../IP";

const apiUrl = ServerIP;

const instance = axios.create({
  baseURL: apiUrl,
});

export const getComments = async (page, limit, csRecipeId) => {
  const response = await instance.get(
    `/CustomRecipeReply/nser/list?page=${page}&size=${limit}&csRecipeId=${csRecipeId}`
  );
  {
    console.log(response);
  }
  return response.data;
};
