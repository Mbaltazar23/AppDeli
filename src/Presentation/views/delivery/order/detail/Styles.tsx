import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const AdminOrderDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  products: {
    width: "100%",
    height: "50%",
  },
  info: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  infoText: {
    flex: 1,
  },
  infoImage: {
    width: 25,
    height: 25,
  },
  infoTitle: {
    color: "black",
  },
  infoDescription: {
    color: "gray",
    fontSize: 13,
    marginTop: 3,
  },
  deliveries: {
    fontWeight: "bold",
    marginTop: 15,
    color: MyColors.primary,
  },
  totalInfo: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontWeight: "bold",
    fontSize: 17,
  },
  button: {
    width: "30%",
  },
  dropDown: {
    marginTop: 15,
  },
});

export default AdminOrderDetailStyles;
