import React from "react";
import { PixelRatio, Platform, Dimensions, StyleSheet } from "react-native";
import { Color } from "./color";
import { relativeWidth } from "./dimensions";
import DeviceInfo from "react-native-device-info";

const { width, height } = Dimensions.get("window");
const realWidth = height > width ? width : height;

const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : 0;
export const NAV_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;
const TAB_HEIGHT = 49;

// const fontBaseX10Small = 10;
// const fontBaseX12Small = 12;
// const fontBaseXSmall = 14;
// const fontBaseSmall = 16;
// const fontBaseNormal = 18;
// const fontBaseLarge = 20;
// const fontBaseXLarge = 24;

const fontBaseX10Small = DeviceInfo.isTablet() ? 12 : 11;
const fontBaseX12Small = DeviceInfo.isTablet() ? 14 : 13;
const fontBaseXSmall = DeviceInfo.isTablet() ? 16 : 15;
const fontBaseSmall = DeviceInfo.isTablet() ? 18 : 17;
const fontBaseNormal = DeviceInfo.isTablet() ? 20 : 19;
const fontBaseLarge = DeviceInfo.isTablet() ? 22 : 21;
const fontBaseXLarge = DeviceInfo.isTablet() ? 26 : 25;

const isTablet = () => {
  if (DeviceInfo.isTablet()) {
    return true;
  } else {
    return false;
  }
};

const responsiveHeight = height => {
  if (!isTablet()) return height;
  else return height + height * 0.25;
};

const drawerWidth = () => {
  if (!isTablet()) return relativeWidth(75);
  else return relativeWidth(60);
};

export const cardStyle = {
  borderRadius: 1,
  borderBottomWidth: 0,
  shadowColor: Color.BLACK,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 5,
  shadowRadius: 2,
  elevation: 2
};

export const circleStyle = {
  height: 70,
  width: 70,
  borderRadius: 35,
  backgroundColor: Color.BORDER_COLOR
};

const responsiveFontSize = fontSize => {
  console.log("******* isTablet() ******", isTablet());
  const deviceType = DeviceInfo.getDeviceType(); // 'Handset'
  console.log("******* deviceType ******", deviceType);

  let divider = isTablet() ? 600 : 375;
  return Math.round((fontSize * realWidth) / divider);
};
const fontX12Small = responsiveFontSize(fontBaseX12Small);
const fontX10Small = responsiveFontSize(fontBaseX10Small);
const fontXSmall = responsiveFontSize(fontBaseXSmall);
const fontSmall = responsiveFontSize(fontBaseSmall);
const fontNormal = responsiveFontSize(fontBaseNormal);
const fontLarge = responsiveFontSize(fontBaseLarge);
const fontXLarge = responsiveFontSize(fontBaseXLarge);

const largeCutoff = 800;
const mediumCutoff = 640;

export {
  fontXSmall,
  fontX12Small,
  fontX10Small,
  fontSmall,
  fontNormal,
  fontLarge,
  fontXLarge,
  drawerWidth,
  responsiveHeight,
  width,
  height,
  mediumCutoff,
  largeCutoff
};
