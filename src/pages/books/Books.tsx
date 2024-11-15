import React from "react";
import { getBooks, useBooks } from "../../api/books";
import { Book } from "../../utils/types";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useQuery } from "react-query";

type QueryError = {
  message: string;
};

const Books: React.FC = () => {
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery<Book[], QueryError>("books", getBooks);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error al cargar los libros {error?.message}
        </Text>
      </View>
    );
  }
  console.log("Books data:", books.data);
  return (
    <View style={styles.container}>
      {books?.length === 0 ? (
        <Text>No hay libros disponibles</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>Autor: {item.author}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Books;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  bookItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    color: "#666",
  },
});
