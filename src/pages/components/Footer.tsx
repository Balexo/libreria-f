import { Button, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Footer: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.footer}>
      <Button
        title="Inicio"
        onPress={() => navigation.navigate("Books")}
      ></Button>
      <Button
        title="Perfil"
        onPress={() => navigation.navigate("Profile")}
      ></Button>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
  },
});
