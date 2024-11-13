import { useState } from "react";
import { TextInput, View, Button } from "react-native";
import { loginUser } from "./AuthService";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (): Promise<void> => {
    try {
      await loginUser(email, password);
    } catch (error) {
      setError("Error al registrarse el usuario");
    }
  };

  const handlePress: () => void = () => {
    handleSignup();
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={handlePress} />
    </View>
  );
};

export default Login;
