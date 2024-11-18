import { View, Text } from "react-native";
import { logOut } from "./AuthService";

// const handleSignout = async (): Promise<void> => {
//     try {
//       await logOut();
//       setIsLoggedIn(false);
//     } catch (error) {
//       setMessage((prevMessage) => [
//         ...prevMessage,
//         { type: "error", text: "Error al cerrar sesión" },
//       ]);
//     }
//   };

const Profile = () => {
  return (
    <View>
      <Text>Ola</Text>
    </View>
  );
};

export default Profile;
