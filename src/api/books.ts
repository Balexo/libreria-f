import { useQuery } from "react-query";
import { client } from "./client";
import { Book } from "../utils/types";

export const getBooks = async (): Promise<Book[]> => {
  const response = await client.get("/books");
  console.log("Api books", response.data);
  return response.data;
};

export const getBookById = async (id: string): Promise<Book[]> => {
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
