import { useEffect, useState } from "react";
import { TextInput, View, Button, Text } from "react-native";
import { registerUser } from "./AuthService";
import { checkFields } from "../../utils/validations";
import { Message } from "../../utils/types";
import { validateFields } from "../../utils/validations";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

type NavigationProp = StackNavigationProp<RootStackParamList, "Books">;

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [registerDisabled, setRegisterDisabled] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const navigation = useNavigation<NavigationProp>();

  const handleRegister = async (): Promise<void> => {
    setMessages([]);

    const validationMessages = validateFields(email, password, repeatPassword);
    if (validationMessages.length > 0) {
      setMessages(validationMessages);
      return;
    }

    try {
      await registerUser(email, password);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "success",
          text: "Usuario registrado correctamente",
        },
      ]);
      navigation.navigate("Books");
    } catch (error) {
      setMessages((prevMesages) => [
        ...prevMesages,
        { type: "error", text: "Error al registrar el usuario" },
      ]);
    }
  };

  useEffect(() => {
    setRegisterDisabled(!checkFields(email, password, repeatPassword));
  }, [email, password, repeatPassword]);

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Repeat password"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
      />
      <Button
        title="Registro"
        disabled={registerDisabled}
        onPress={handleRegister}
      />
      {messages.length > 0 && (
        <View style={{ marginTop: 20 }}>
          {messages.map((message, index) => (
            <Text
              key={index}
              style={{ color: message.type === "error" ? "red" : "green" }}
            >
              {message.text}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default Register;
