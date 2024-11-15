import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";
import { SECRET_KEY } from "@env";

const TOKEN_KEY = "userToken";
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY no está definido en las variables de entorno");
}

const encrypToken = (token: string): string => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

const desencrypToken = (encryptedToken: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.log("Error al desesncriptar", error);
    return null;
  }
};

export const saveToken = async (token: string): Promise<void> => {
  try {
    const encryptedToken = encrypToken(token);
    await AsyncStorage.setItem(TOKEN_KEY, encryptedToken);
  } catch (error) {
    console.log("Error al guardar el token", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const encryptedToken = await AsyncStorage.getItem(TOKEN_KEY);
    if (encryptedToken) {
      return desencrypToken(encryptedToken);
    }
    return null;
  } catch (error) {
    console.log("Error al obtener el token", error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.log("No se ha podido borrar el token", error);
  }
};
