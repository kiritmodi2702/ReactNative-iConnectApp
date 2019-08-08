import { StyleSheet, Dimensions } from "react-native";
import { Color } from "../../utils/color";
import { largeCutoff, mediumCutoff } from "../../utils/theme";
import Globle from "./../../utils/Globals";

let loginStyle = {
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Color.BACKGROUND_COLOR
  },
  logoStyle: {
    width: 180,
    height: 100,
    marginBottom: 20
  },

  commonBtnStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Dimensions.get("window").height * 0.03,
    width: Globle.Pad.isIpad === 1 ? Dimensions.get("window").width - 80 : 340
  },
  forgotBtnStyle: {
    backgroundColor: Color.TRANSPARENT,
    paddingTop: 10,
    paddingBottom: 10,
    width: 160
  },
  signupStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Color.BLACK,
    marginLeft: 5
  }
};

const styles = StyleSheet.create(loginStyle);

export default styles;
