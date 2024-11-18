import "react-native-gesture-handler";
import "react-native-reanimated";
import { registerRootComponent } from "expo";
import App from "./src/App";
import { store } from "./src/store/store";
import { Provider } from "react-redux";

const RootApp: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(RootApp);
