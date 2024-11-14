import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { store } from "../../../store/store";
import { login, logout } from "../../../store/authSlice";

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
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
    });

    const token = await user.getIdToken();
    store.dispatch(
      login({ user: { email: user.email!, uid: user.uid }, token }),
    );
  } catch (error) {
    console.log("Error al registro de usuario", error);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    const token = await user.getIdToken();
    store.dispatch(
      login({ user: { email: user.email!, uid: user.uid }, token }),
    );
  } catch (error) {
    console.log("Problemas al iniciar sesión", error);
    throw error;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    store.dispatch(logout());
  } catch (error) {
    console.log("Error al hacer sign out", error);
    throw error;
  }
};
