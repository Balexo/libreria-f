import { useState } from "react";
import { TextInput, View, Button } from "react-native";
import { loginUser, logOut } from "./AuthService";

type MessageType = "success" | "error";

interface Message {
  type: MessageType;
  text: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<Message[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isLoggedIn ? (
        <Button title="Iniciar sesión" onPress={handleSignup} />
      ) : (
        <Button title="Cerrar sesión" onPress={handleSignout} />
      )}
      {message?.length > 0 && <View></View>}
    </View>
  );
};

export default Login;
