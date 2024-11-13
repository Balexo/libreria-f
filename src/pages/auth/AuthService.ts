import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const db = getFirestore();

export const registerUser = async (
  email: string,
  password: string,
  uid?: string,
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
    });

    return userCredential;
  } catch (error) {
    console.log('Error al registro de usuario', error);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  } catch (error) {
    console.log('Problemas al iniciar sesión', error);
    throw error;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    signOut(auth);
  } catch (error) {
    console.log('Error al hacer sign out', error);
    throw error;
  }
};
