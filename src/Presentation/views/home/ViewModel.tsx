import React, { useState } from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/LoginAuth";

const HomeViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const login = async () => {
    if (isValidForm()) {
      const response = await LoginAuthUseCase(values.email, values.password);
      console.log("response : " + JSON.stringify(response));
      if (!response.success) {
        setErrorMessage(response.message);
      }
    }
  };

  const isValidForm = (): boolean => {
    if (values.email === "") {
      setErrorMessage("Ingrese un correo electronico");
      return false;
    }
    if (values.password === "") {
      setErrorMessage("Ingrese un password");
      return false;
    }
    return true;
  };
  return {
    ...values,
    onChange,
    errorMessage,
    login,
  };
};

export default HomeViewModel;
