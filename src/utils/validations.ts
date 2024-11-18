import { Message } from "./types";

export const checkFields = (...fiedls: string[]): boolean => {
  return fiedls.every((field) => field.trim() !== "");
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/;
  return passwordRegex.test(password);
};

export const validateFields = (
  email: string,
  password: string,
  repeatPassword: string,
): Message[] => {
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

  return newMessages;
};
