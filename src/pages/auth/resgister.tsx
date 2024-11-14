import { useEffect, useState } from "react";
import { TextInput, View, Button, Text } from "react-native";
import { registerUser } from "./AuthService";

type MessageType = "success" | "error";

interface Message {
  type: MessageType;
  text: string;
}

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [registerDisabled, setRegisterDisabled] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateFields = (): boolean => {
    setMessages([]);

    const newMessages: Message[] = [];

    if (!validateEmail(email)) {
      newMessages.push({
        type: "error",
        text: "El email no tiene un formato válido. Un formato válido es usuario@email.com",
      });
    }

    if (!validatePassword(password)) {
      newMessages.push({
        type: "error",
        text: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un dígito y un carácter especial.",
      });
    }

    if (password != repeatPassword) {
      newMessages.push({
        type: "error",
        text: "Las contraseñas deben coincidir",
      });
    }
    setMessages(newMessages);

    return newMessages.length === 0;
  };

  const handleRegister = async (): Promise<void> => {
    setMessages([]);

    if (!validateFields()) {
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
    } catch (error) {
      setMessages((prevMesages) => [
        ...prevMesages,
        { type: "error", text: "Error al registrar el usuario" },
      ]);
    }
  };

  const checkFields = () => {
    if (email.trim() && password.trim() && repeatPassword.trim()) {
      setRegisterDisabled(false);
    } else {
      setRegisterDisabled(true);
    }
  };

  useEffect(() => {
    checkFields();
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
