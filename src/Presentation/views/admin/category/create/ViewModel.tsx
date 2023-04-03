import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { CategoryContext } from "../../../../context/CategoryContext";

const AdminCategoryCreateViewModel = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const { create } = useContext(CategoryContext);
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const createCategory = async () => {
    setLoading(true);
    const response = await create(values, file!);
    setResponseMessage(response.message);
    setLoading(false);

    resetForm();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const resetForm = async () => {
    setValues({
      name: "",
      description: "",
      image: "",
    });
  };

  return {
    ...values,
    onChange,
    takePhoto,
    pickImage,
    createCategory,
    loading,
    responseMessage,
  };
};

export default AdminCategoryCreateViewModel;
