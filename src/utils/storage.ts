import AsyncStorage from "@react-native-async-storage/async-storage";
import { SECRET_KEY } from "@env";

const TOKEN_KEY = "userToken";
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY no está definido en las variables de entorno");
}

export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.log("Error al guardar el token", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
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
