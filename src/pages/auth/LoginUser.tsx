import { useState } from "react";
import {
  TextInput,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { loginUser, logOut } from "./AuthService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type MessageType = "success" | "error";

interface Message {
  type: MessageType;
  text: string;
}

type NavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface Props {
  navigation: NavigationProp;
}

const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<Message[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp>();

  const handleSignup = async (): Promise<void> => {
    try {
      await loginUser(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      setMessage((prevMessages) => [
        ...prevMessages,
        { type: "error", text: "Error al registrarse el usuario" },
      ]);
    }
  };

  const handleSignout = async (): Promise<void> => {
    try {
      await logOut();
      setIsLoggedIn(false);
    } catch (error) {
      setMessage((prevMessage) => [
        ...prevMessage,
        { type: "error", text: "Error al cerrar sesión" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputs}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Regístrate aquí</Text>
      </TouchableOpacity>

      {!isLoggedIn ? (
        <Button title="Iniciar sesión" onPress={handleSignup} />
      ) : (
        <Button title="Cerrar sesión" onPress={handleSignout} />
      )}
      {message?.length > 0 && <View></View>}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    fontSize: 30,
  },
  link: {
    fontSize: 18,
    color: "blue",
  },
});
