import { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { loginUser } from "./AuthService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { login } from "../../store/authSlice";
import { Message } from "../../utils/types";
import { CustomError } from "../../utils/errors";

type NavigationProp = StackNavigationProp<RootStackParamList, "Login">;
type RouteParams = RouteProp<RootStackParamList, keyof RootStackParamList>;

interface Props {
  navigation: NavigationProp;
}

const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<Message[]>([]);
  const [LoginDisabled, SetLoginDisabled] = useState<boolean>(true);

  const isLoggedIn = useSelector(
    (state: RootState) => state.authState.isAuthenticated,
  );

  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();
  const dispatch = useDispatch();

  const checkFields = () => {
    if (email.trim() && password.trim()) {
      SetLoginDisabled(false);
    } else {
      SetLoginDisabled(true);
    }
  };

  const handleSignup = async (): Promise<void> => {
    setMessage([]);
    checkFields();
    try {
      const { token, uid, email: userEmail } = await loginUser(email, password);
      dispatch(login({ user: { email: userEmail, uid }, token }));
      navigation.navigate("Books");
    } catch (error: any) {
      if (error && error.message) {
        setMessage((prevMessages) => [
          ...prevMessages,
          { type: "error", text: error.message },
        ]);
      } else {
        setMessage((prevMessages) => [
          ...prevMessages,
          { type: "error", text: "Error al iniciar sesión" },
        ]);
      }
    }
  };

  useEffect(() => {
    checkFields();
  }, [email, password]);

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

      <Button
        title="Iniciar sesión"
        disabled={LoginDisabled}
        onPress={handleSignup}
      />

      {message?.length > 0 && (
        <View>
          {message.map((item, index) => (
            <Text
              key={index}
              style={{ color: item.type === "error" ? "red" : "green" }}
            >
              {item.text}
            </Text>
          ))}
        </View>
      )}
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
