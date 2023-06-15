import { StyleSheet } from "react-native";

const ClientPaymentFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  form: {
    marginTop: 15,
  },
  buttonContainer: {
    width: "100%",
    padding:20
  },
  dropdown:{
    marginHorizontal:20,
    flex: 1,
    marginTop:30
  },
  check: {
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
}
});

export default ClientPaymentFormStyles;
