import { Timestamp } from "firebase/firestore";

export interface Book {
  id: string;
  ownerId: string;
  title: string;
  author: string;
  publication_year: number;
  isbn: string;
  publisher: string;
  genre: string;
  language: string;
  number_of_pages: number;
  description: string;
  cover_image: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export type MessageType = "success" | "error";

export interface Message {
  type: MessageType;
  text: string;
}
