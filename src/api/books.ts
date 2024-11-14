import { useQuery } from "react-query";
import { client } from "./client";

export const getBooks = async () => {
  const response = await client.get("/books");
  return response.data;
};

export const getBookById = async (id: string) => {
  const response = await client.get(`/books/${id}`);
  return response.data;
};

export const useBooks = () => {
  return useQuery("books", getBooks);
};

export const useBookById = (id: string) => {
  return useQuery(["book", id], () => getBookById(id), {
    enabled: !!id,
  });
};
