import { StyleSheet } from "react-native";

const AdminCategoryCreateStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  imageContainer: {
    paddingTop: 50,
  },
  form: {
    backgroundColor: "white",
    height: "65%",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 0,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
});

export default AdminCategoryCreateStyles;
