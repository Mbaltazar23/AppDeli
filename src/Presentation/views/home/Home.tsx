import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  View,
  Text,
  TextInput,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { CustomTextInput } from "../../components/CustomTextInput";

export const HomeScreen = () => {
  const { email, password, onChange, login, errorMessage } = useViewModel();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (errorMessage !== '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  return (
    // COLUMN
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/chef.jpg")}
        style={styles.imageBackground}
      />

      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.logoImage}
        />

        <Text style={styles.logoText}>FOOD APP</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formText}>INGRESAR</Text>

        <CustomTextInput
          image={require("../../../../assets/email.png")}
          placeholder="Correo electronico"
          keyboardType="email-address"
          property="email"
          onChangeText={onChange}
          value={email}
        />

        <CustomTextInput
          image={require("../../../../assets/password.png")}
          placeholder="Contraseña"
          keyboardType="default"
          property="password"
          onChangeText={onChange}
          value={password}
          secureTextEntry={true}
        />

        <View style={{ marginTop: 30 }}>
          <RoundedButton text="LOGIN" onPress={() => login()} />
        </View>

        <View style={styles.formRegister}>
          <Text>No tienes cuenta?</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.formRegisterText}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
