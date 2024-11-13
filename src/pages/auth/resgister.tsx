import { useEffect, useState } from "react";
import { TextInput, View, Button, Text } from "react-native";
import { registerUser } from "./AuthService";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [registerDisabled, setRegisterDisabled] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [successRegistration, setSuccesRegistration] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateFields = (): boolean => {
    const errors: string[] = [];

    if (!validateEmail(email)) {
      errors.push(
        "El email no tiene un formato válido. Un formato válido es usuario@email.com",
      );
    }

    if (!validatePassword(password)) {
      errors.push(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un dígito y un carácter especial.",
      );
    }

    if (password != repeatPassword) {
      errors.push("Las contraseñas deben coincidir");
    }
    setValidationErrors(errors);

    return errors.length === 0;
  };

  const handleRegister = async (): Promise<void> => {
    setValidationErrors([]);

    if (!validateFields()) {
      return;
    }

    try {
      await registerUser(email, password);
      setSuccesRegistration("Usuario registrado correctamente");
    } catch (error) {
      setValidationErrors(["Error al registrar el usuario"]);
    }
  };

  const handlePress: () => void = () => {
    handleRegister();
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
        onPress={handlePress}
      />
      {validationErrors.length > 0 && (
        <View style={{ marginTop: 20 }}>
          {validationErrors.map((error, index) => (
            <Text key={index} style={{ color: "red" }}>
              {error}
            </Text>
          ))}
        </View>
      )}
      {successRegistration.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "green" }}>{successRegistration}</Text>
        </View>
      )}
    </View>
  );
};

export default Register;
