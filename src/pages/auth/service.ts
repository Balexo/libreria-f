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
