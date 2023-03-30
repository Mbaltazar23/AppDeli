import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import { RoundedButton } from "../../../../components/RoundedButton";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import styles from "./Styles";
import useViewModel from "./ViewModel";

export const AdminCategoryCreateScreen = () => {
  const {
    name,
    description,
    onChange,
    responseMessage,
    loading,
    takePhoto,
    pickImage,
    image,
    createCategory,
  } = useViewModel();
  
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}
      >
        {image == "" ? (
          <Image
            source={require("../../../../../../assets/image_new.png")}
            style={styles.image}
          />
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <CustomTextInput
          placeholder="Nombre de la categoria"
          keyboardType="default"
          image={require("../../../../../../assets/categories.png")}
          property="name"
          onChangeText={onChange}
          value={name}
        />
        <CustomTextInput
          placeholder="Descripcion de la Categoria"
          keyboardType="default"
          image={require("../../../../../../assets/description.png")}
          property="description"
          onChangeText={onChange}
          value={description}
        />
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton
          text="CREAR CATEGORIA"
          onPress={() => createCategory()}
        />
      </View>

      <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
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
