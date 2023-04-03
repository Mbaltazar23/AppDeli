import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";
import useViewModel from "./ViewModel";
import { FlatList } from "react-native-gesture-handler";
import { AdminProductListItem } from "./Item";
interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductListScreen"> {}

export const AdminProductListScreen = ({ navigation, route }: Props) => {
  const { category } = route.params;
  const { products, getProducts } = useViewModel();
  console.log("Category: " + JSON.stringify(category));

  useEffect(() => {
    getProducts(category.id!);
  }, []);

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AdminProductListItem product={item} remove={() => {}} />
        )}
      />
    </View>
  );
};
