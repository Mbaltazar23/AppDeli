import React, { useState } from "react";
import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth";
import * as ImagePicker from "expo-image-picker";

const RegisterViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  const [file, setFile] = useState<ImagePicker.ImageInfo>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      onChange("image", result.uri);
      setFile(result);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      onChange("image", result.uri);
      setFile(result);
    }
  };

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const register = async () => {
    if (isValidForm()) {
      const response = await RegisterAuthUseCase(values);
      console.log("RESULT: " + JSON.stringify(response));
    }
  };

  const isValidForm = (): boolean => {
    if (values.name === "") {
      setErrorMessage("Ingresa tu nombre");
      return false;
    }
    if (values.lastname === "") {
      setErrorMessage("Ingresa tu apellido");
      return false;
    }
    if (values.email === "") {
      setErrorMessage("Ingresa tu correo electronico");
      return false;
    }
    if (values.phone === "") {
      setErrorMessage("Ingresa tu telefono");
      return false;
    }
    if (values.password === "") {
      setErrorMessage("Ingresa la contraseña");
      return false;
    }
    if (values.confirmPassword === "") {
      setErrorMessage("Ingresa la confirmacion de la contraseña");
      return false;
    }
    if (values.password !== values.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return false;
    }

    return true;
  };

  return {
    ...values,
    onChange,
    register,
    pickImage,
    takePhoto,
    errorMessage,
  };
};

export default RegisterViewModel;
