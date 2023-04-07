import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { RoundedButton } from "../../../../components/RoundedButton";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import styles from "./Styles";
import useViewModel from "./ViewModel";
import { StackScreenProps } from "@react-navigation/stack";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";
import { ModalPickMultipleImage } from "../../../../components/ModalPickMultipleImage";

interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductUpdateScreen"> {}

export const AdminProductUpdateScreen = ({ navigation, route }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [numberImage, setNumberImage] = useState(1);

  const { category, product } = route.params;
  const {
    name,
    description,
    price,
    onChange,
    responseMessage,
    loading,
    takePhoto,
    pickImage,
    image1,
    image2,
    image3,
    updateProduct,
  } = useViewModel(product, category);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            setNumberImage(1);
            setModalVisible(true);
          }}
        >
          {image1 == "" ? (
            <Image
              source={require("../../../../../../assets/image_new.png")}
              style={styles.image}
            />
          ) : (
            <Image source={{ uri: image1 }} style={styles.image} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNumberImage(2);
            setModalVisible(true);
          }}
        >
          {image2 == "" ? (
            <Image
              source={require("../../../../../../assets/image_new.png")}
              style={styles.image}
            />
          ) : (
            <Image source={{ uri: image2 }} style={styles.image} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNumberImage(3);
            setModalVisible(true);
          }}
        >
          {image3 == "" ? (
            <Image
              source={require("../../../../../../assets/image_new.png")}
              style={styles.image}
            />
          ) : (
            <Image source={{ uri: image3 }} style={styles.image} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <View style={styles.categoryInfo}>
            <Image
              style={styles.imageCategory}
              source={require("../../../../../../assets/menu.png")}
            />
            <Text style={styles.textCategory}>Categoria Seleccionada </Text>
            <Text>{category.name}</Text>
          </View>

          <CustomTextInput
            placeholder="Nombre del producto"
            keyboardType="default"
            image={require("../../../../../../assets/categories.png")}
            property="name"
            onChangeText={onChange}
            value={name}
          />
          <CustomTextInput
            placeholder="Descripcion"
            keyboardType="default"
            image={require("../../../../../../assets/description.png")}
            property="description"
            onChangeText={onChange}
            value={description}
          />
          <CustomTextInput
            placeholder="Precio"
            keyboardType="numeric"
            image={require("../../../../../../assets/price.png")}
            property="price"
            onChangeText={onChange}
            value={`${price}`}
          />
          <View style={styles.buttonContainer}>
            <RoundedButton
              text="ACTUALIZAR PRODUCTO"
              onPress={() => updateProduct()}
            />
          </View>
        </ScrollView>
      </View>

      <ModalPickMultipleImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
        numberImage={numberImage}
      />

      {loading && (
        <ActivityIndicator
          style={MyStyles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
};
