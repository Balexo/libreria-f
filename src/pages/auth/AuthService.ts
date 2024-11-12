import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

export const registerUser = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  } catch (error) {
    console.log('Error al registro de usuario', error);
    throw error;
  }
};

export const signupUser = async (
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

// import { client, setAuthorizationHeader, removeAuthorizationHeader } from "../../api/client";
// import storage from "../../utils/storage";

// export const login = async(email:string, password:string, requestStorage:boolean)=>{
//     const credentials=  {email, password, requestStorage}

//     return client
//     .post("user/signup", credentials)
//     .then({token, username, uid, updatedAt})=>{
//         if(requestStorage){
//             storage.set("authToken", token),
//             storage.set("username", username),
//             storage.set("uid", uid),
//             storage.set("updatedAt", updatedAt)

//         }else{
//             sessionStorage.setItem("token", token)
//         }

//         if(token){
//             return{
//                 user:{
//                     username: username,
//                     uid: uid,
//                     updatedAt: updatedAt,
//                 }
//             }
//         }
//     }
// }
