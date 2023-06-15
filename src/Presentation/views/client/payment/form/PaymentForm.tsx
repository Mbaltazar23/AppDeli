import React, { useEffect } from "react";
import { Pressable, Image, View } from "react-native";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import CreditCard from "react-native-credit-card-form-ui";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavitagor";
import { RoundedButton } from "../../../../components/RoundedButton";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientPaymentFormScreen"> {}

export const ClientPaymentFormScreen = ({ navigation, route }: Props) => {
  const {
    creditCardRef,
    handleSubmit,
    getIdentificationTypes,
    open,
    value,
    items,
    setOpen,
    setItems,
    setValue,
    onChange,
    cardToken,
    identificationNumber,
  } = useViewModel();

  useEffect(() => {
    getIdentificationTypes();
  }, []);

  useEffect(() => {
    console.log("CARD TOKEN: "+ JSON.stringify(cardToken,null,3));
    
    if (cardToken !== undefined && cardToken !== null) {
      navigation.navigate("ClientPaymentInstallmentsScreen", {
        cardToken: cardToken,
      });
    }
  }, [cardToken]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <CreditCard
          ref={creditCardRef}
          background={"#e2e2e2"}
          textColor={"black"}
          labels={{
            holder: "titular",
            cvv: "Codigo de seguridad",
            expiration: "Expiration",
          }}
          placeholders={{
            number: "0000 0000 0000 0000",
            cvv: "xxx",
            expiration: "MM/YYYY",
            holder: "Nombre del titular",
          }}
          placeholderTextColor={"gray"}
        />
      </View>
      <View style={styles.dropdown}>
        {/* <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <CustomTextInput
          placeholder="Numero de identificacion"
          keyboardType="default"
          image={require("../../../../../../assets/document.png")}
          property="identificationNumber"
          onChangeText={onChange}
          value={identificationNumber}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => handleSubmit()}>
          <Image
            style={styles.check}
            source={require('../../../../../../assets/checked.png')}
            
          />
        </Pressable>*/}
        <RoundedButton text='CONTINUAR' onPress={() => handleSubmit()}/> 
      </View>
    </View>
  );
};
