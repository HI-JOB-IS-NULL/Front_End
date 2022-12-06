import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com/";

const instance = axios.create({
  baseURL: apiUrl,
});

export const getComments = async (page, limit) => {
  const response = await instance.get(
    `/comments?_page=${page}&_limit=${limit}`
  );
  return response.data;
};