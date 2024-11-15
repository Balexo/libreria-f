import React from "react";
import "./firebase";
import { StyleSheet } from "react-native";
import Register from "./pages/auth/Resgister";
import Login from "./pages/auth/LoginUser";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Books from "./pages/books/Books";
import { QueryClient, QueryClientProvider } from "react-query";

type RootStackParamList = {
  Books: undefined;
  Register: undefined;
  Login: undefined;
};
const queryClient = new QueryClient();
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator initialRouteName="Books">
          <Stack.Screen name="Books" component={Books} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
