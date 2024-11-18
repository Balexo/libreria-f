import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  getIdTokenResult,
  onAuthStateChanged,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { store } from "../../store/store";
import { login, logout } from "../../store/authSlice";
import { removeToken, saveToken } from "../../utils/storage";
import { CustomError } from "../../utils/errors";

const db = getFirestore();

export const registerUser = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    if (user) {
      const token = await user.getIdToken();
      await saveToken(token);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      store.dispatch(
        login({ user: { email: user.email!, uid: user.uid }, token }),
      );
    }
  } catch (error: any) {
    console.log(
      { type: "error", text: "Error al registro de usuario" },
      error.message,
    );
    throw {
      type: "error",
      message: "No se pudo registrar el usuario, inténtelo de nuevo",
    };
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ token: string; uid: string; email: string }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    if (user) {
      const token = await user.getIdToken();
      const uid = user.uid;

      await saveToken(token);

      return { token, uid, email: user.email ?? "" };
    }
    throw new CustomError("error", "Usuario no encontrado");
  } catch (error: any) {
    if (error.code === "auth/invalid-credential") {
      throw new CustomError("error", "Revise el correo y la contraseña");
    } else if (error.code === "auth/invalid-email") {
      throw new CustomError("error", "El formato del correo no es válido");
    } else {
      throw new CustomError(
        "error",
        "Ha habido algún problema. No se pudo iniciar sesión.",
      );
    }
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    await removeToken();

    store.dispatch(logout());
  } catch (error: any) {
    console.log("Error al hacer sign out", error.message);
    throw new CustomError(
      "error",
      "No se pudo cerrar la sesión. Inténtelo de nuevo",
    );
  }
};

export const getUserFromToken = async () => {
  return new Promise<{ email: string; uid: string; token: string } | null>(
    (resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const tokenResult = await getIdTokenResult(user);
          console.log("tokenResult", tokenResult);
          resolve({
            email: user.email ?? "",
            uid: user.uid,
            token: tokenResult.token,
          });
        } else {
          resolve(null);
        }
      });
    },
  );
};
