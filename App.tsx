import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { MainStackNavitagor } from "./src/Presentation/navigator/MainStackNavitagor";

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavitagor />
    </NavigationContainer>
  );
};

export default App;
