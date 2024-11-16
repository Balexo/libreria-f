import React from "react";
import "./firebase";
import Register from "./pages/auth/Resgister";
import Login from "./pages/auth/LoginUser";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Books from "./pages/books/Books";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./pages/components/Footer";
import Profile from "./pages/auth/Profile";
import { Provider } from "react-redux";
import { store } from "./store/store";

export type RootStackParamList = {
  Books: undefined;
  Register: undefined;
  Login: undefined;
  Profile: undefined;
};
const queryClient = new QueryClient();
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator initialRouteName="Books">
            <Stack.Screen name="Books" component={Books} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
          <Footer />
        </QueryClientProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
