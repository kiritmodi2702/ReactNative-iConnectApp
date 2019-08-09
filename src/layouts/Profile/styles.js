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
  itemViewStyle: {
    padding: 10,
    width: Dimensions.get("window").width - 40,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: Color.WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  lblTitleStyle: {
    marginTop: Dimensions.get("window").height * 0.05,
    marginBottom: Dimensions.get("window").height * 0.03,
    alignSelf: "center"
  },
  commonBtnStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Dimensions.get("window").height * 0.04,
    paddingBottom: 20
  },
  keybordStyle: {
    width: "100%",
    marginTop: 0,
    marginBottom: 0
  },
  profileTouchView: {
    width: width - 40,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    flexDirection: "row"
  },
  profileImageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center"
  },
  fieldSubView: {
    flexDirection: "row",
    width: Dimensions.get("window").width - 80,
    justifyContent: "space-between"
  },
  saveEditStyle: {
    backgroundColor: Color.BUTTON_BG_COLOR,
    padding: 10,
    width: width - 40,
    marginTop: 20
  },
  logoffStyle: {
    backgroundColor: Color.ERROR_COLOR,
    padding: 10,
    width: width - 40,
    marginTop: 20
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
}
//@ts-ignore
const styles = StyleSheet.create(signUpStyle);

export default styles;
