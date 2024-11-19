import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { logOut } from "./AuthService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { isCancelable } from "react-query/types/core/retryer";

type NavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

const Profile = () => {
  const [message, setMessage] = useState<string>("");
  const navigation = useNavigation<NavigationProp>();

  const confirmSignout = (): void => {
    Alert.alert(
      "Confirmar cierre de sesión",
      "¿Seguro que quieres cerrar sesión?",
      [
        {
          text: "No",
          onPress: () => console.log("Cierre de sesión cancelada"),
          style: "cancel",
        },
        { text: "Sí", onPress: () => handleSignout },
      ],
      {
        cancelable: true,
      },
    );
  };

  const handleSignout = async (): Promise<void> => {
    try {
      await logOut();
      navigation.navigate("Books");
    } catch (error) {
      setMessage("Error al cerrar sesión.");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleSignout} style={styles.buttonContainer}>
        <Text>Log Out</Text>
      </Pressable>
      {message.length > 0 && <Text style={styles.errorMessage}>{message}</Text>}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorMessage: {
    marginTop: 20,
    color: "red",
    fontSize: 16,
  },
});
