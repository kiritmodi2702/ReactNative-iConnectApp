import { StyleSheet, Dimensions } from "react-native";
import { Color } from "../../utils/color";
import { largeCutoff, mediumCutoff } from "../../utils/theme";
import {
  fontXSmall,
  fontSmall,
  fontNormal,
  fontLarge,
  fontXLarge,
  fontX12Small
} from "../../utils/theme";
import Globle from "../../utils/Globals";

let customNavigation = {
  containerStyle: {
    flexDirection: "row",
    backgroundColor: Color.BUTTON_BG_COLOR,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  },
  navigationInsideStyle: {
    width: Dimensions.get("window").width - 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10
  },
  notificationViewStyle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.BUTTON_BG_COLOR,
    position: "absolute",
    right: 0
  },
  profileStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden"
  }
};

const screenDims = Dimensions.get("screen");
if (screenDims.height > largeCutoff) {
  //large
} else if (screenDims.height > mediumCutoff) {
  //medium
} else {
  //small
}
//@ts-ignore
const styles = StyleSheet.create(customNavigation);

export default styles;
