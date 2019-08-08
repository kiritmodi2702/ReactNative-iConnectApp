import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color } from "../../utils/color";
const { height, width } = Dimensions.get("window");
const HEADER_SIZE = isIphoneX() ? 135 : 70;
const HeightView =
  Dimensions.get("window").height -
  HEADER_SIZE -
  (Platform.OS !== "ios" ? 30 : 0) -
  (Globle.Pad.isIpad === 1 ? 50 : 80) -
  50;
import { isIphoneX } from "../../utils/isIphone-x";
import Globle from "../../utils/Globals";
const WIDTH = Dimensions.get("window").width;

let stripeStyle = {
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_COLOR
  },
  itemViewStyle: {
    height: 60,
    flexDirection: "row",
    width: WIDTH - 40,
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: Color.WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignItems: "center"
  },
  sideColorStyle: {
    width: 40,
    height: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  flatListItemStyle: {
    height: 45,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 80
  },
  textFieldStyle: {
    padding: 5,
    height: 30,
    width: 80,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center"
  },
  itemStyleSide: {
    width: 40,
    borderRadius: 5,
    borderWidth: 1,
    overflow: "hidden"
  }
};

const styles = StyleSheet.create(stripeStyle);

export default styles;
