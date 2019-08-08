import DeviceInfo from "react-native-device-info";
module.exports = {
  Pad: {
    isIpad: DeviceInfo.isTablet() ? 1.2 : 1
  }
};
