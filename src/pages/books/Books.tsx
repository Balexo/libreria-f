import React from "react";
import { getBooks, useBooks } from "../../api/books";
import { Book } from "../../utils/types";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  RefreshControl,
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
    refetch,
    isFetching,
  } = useQuery<Book[], QueryError>("books", getBooks);

  const handleRefresh = () => {
    refetch();
  };

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

  return (
    <View style={styles.container}>
      {books?.length === 0 ? (
        <Text>No hay libros disponibles</Text>
      ) : (
        <FlatList
          data={books}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.title}>{item.title}</Text>
              {item.cover_image ? (
                <Image
                  style={styles.image}
                  source={{ uri: item.cover_image }}
                ></Image>
              ) : (
                <Text>No hay imagen</Text>
              )}
            </View>
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
          }
          showsVerticalScrollIndicator={false}
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
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
  image: {
    height: 100,
    width: 80,
  },
  listContent: {
    paddingBottom: 20,
  },
});
