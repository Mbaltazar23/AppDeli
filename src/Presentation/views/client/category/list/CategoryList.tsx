import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavitagor";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { ClientCategoryItem } from "./Item";
import useViewModel from "./ViewModel";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientCategoryListScreen"> {}

export const ClientCategoryListScreen = ({ navigation, route }: Props) => {
  const { categories, getCategories } = useViewModel();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [mode, setMode] = useState<any>("horizontal-stack");
  const [snapDirection, setSnapDirection] = useState<"left" | "right">("left");

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{
        position:"absolute",
        alignSelf: 'center',
        top: height * 0.1
      }}>
        <Carousel
          loop={false}
          width={width}
          height={height}
          autoPlay={true}
          data={categories}
          scrollAnimationDuration={5000}
          renderItem={({ item }) => (
            <ClientCategoryItem
              category={item}
              height={height * 0.62}
              width={width - 70}
              navigation={navigation}
            />
          )}
          modeConfig={{
            snapDirection,
            stackInterval: 30,
          }}
          mode={mode}
        />
      </View>
    </GestureHandlerRootView>
  );
};
