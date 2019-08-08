import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color } from "../../utils/color";
import { largeCutoff, mediumCutoff } from "../../utils/theme";
import Globle from "../../utils/Globals";
const { width, height } = Dimensions.get("window");

let signUpStyle = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Color.BACKGROUND_COLOR
  },

  lblTitleStyle: {
    marginTop: Dimensions.get("window").height * 0.05,
    marginBottom: Dimensions.get("window").height * 0.03,
    alignSelf: "center"
  },
  keybordStyle: {
    width: "100%",
    marginTop: 0,
    marginBottom: 0
  },
  profileStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10
  },
  profileImage: {
    width: 100,
    height: 100,
    overflow: "hidden",
    borderRadius: 50
  },
  subViewStyle: {
    flexDirection: "row",
    width: Dimensions.get("window").width - 80,
    justifyContent: "space-between"
  },
  loginNow: {
    borderBottomWidth: 1,
    borderBottomColor: Color.BLACK,
    marginLeft: 5
  },
  alreadyMember: {
    flexDirection: "row",
    marginTop: height * 0.03,
    alignSelf: "center"
  },
  checkBoxV: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  }
};

const screenDims = Dimensions.get("screen");
if (screenDims.height > largeCutoff) {
  //large
  signUpStyle.keybordStyle.marginTop = Platform.OS === "ios" ? 0 : 20;
  signUpStyle.keybordStyle.marginBottom = Platform.OS === "ios" ? 0 : 20;
} else if (screenDims.height > mediumCutoff) {
  //medium
  signUpStyle.keybordStyle.marginTop = Platform.OS === "ios" ? 0 : 20;
  signUpStyle.keybordStyle.marginBottom = Platform.OS === "ios" ? 0 : 20;
} else {
  //small
  signUpStyle.keybordStyle.marginTop = Platform.OS === "ios" ? 0 : 10;
  signUpStyle.keybordStyle.marginBottom = 10;
  signUpStyle.countryStyle.height = 40;
  signUpStyle.countryStyle.marginTop = 10;
}
//@ts-ignore
const styles = StyleSheet.create(signUpStyle);

export default styles;
