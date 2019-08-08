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
import { fontXSmall, fontX12Small } from "../../utils/theme";
import DeviceInfo from "react-native-device-info";
const WIDTH = Dimensions.get("window").width;

let myReposrtScreen = {
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_COLOR
  },
  itemViewStyle: {
    padding: 10,
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
    alignItems: "center",
    justifyContent: "center"
  }
};

const styles = StyleSheet.create(myReposrtScreen);

export default styles;
