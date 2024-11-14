import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "userToken";

export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.log("Error al guardar el token", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    await AsyncStorage.getItem(TOKEN_KEY);
    return TOKEN_KEY;
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
