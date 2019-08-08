import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  AsyncStorage,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { Color } from "../../utils/color";
import PropTypes from "prop-types";

import { isIphoneX } from "./../../utils/isIphone-x";
import Label from "../Label";
const HEADER_SIZE = isIphoneX() ? 100 : 66;

import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import championFontConfige from "./../../../selection.json";

import { NavigationActions } from "react-navigation";
import {
  fontSmall,
  fontNormal,
  fontLarge,
  fontX10Small
} from "../../utils/theme";
const Icon = createIconSetFromIcoMoon(championFontConfige);
import styles from "./styles";

class CustomNavigation extends React.Component {
  componentDidMount() {
    console.log("*** Component Did Mount ***");
  }
  render() {
    // console.log("HEADER_SIZE", HEADER_SIZE);
    return (
      <SafeAreaView style={[styles.containerStyle, { height: HEADER_SIZE }]}>
        <View style={styles.navigationInsideStyle}>
          <View
            style={{
              width: 35,
              height: 35,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Back button with conditin */}
            {this.props.isBack && (
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => this.props.goBackClick()}
              >
                <Icon
                  name={"back_arrow"}
                  style={{
                    color: Color.WHITE,
                    fontSize: fontSmall,
                    alignSelf: "center"
                  }}
                />
              </TouchableOpacity>
            )}
          </View>

          <Label small Futura_Heavy color={Color.WHITE}>
            {this.props.navigationTitle}
          </Label>

          <View
            style={{
              width: 35,
              height: 35,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {this.props.isNext && (
              <TouchableOpacity
                onPress={this.props.nextClick}
                style={{
                  width: 60,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Label small Futura_Medium color={Color.WHITE}>
                  {"Next"}
                </Label>
              </TouchableOpacity>
            )}

            {this.props.isLogout && (
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  Alert.alert(
                    "General Electronics",
                    "Are you sure to logout from the application?",
                    [
                      {
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      {
                        text: "Yes",
                        onPress: () => {
                          AsyncStorage.setItem("isLogin", "isLogout");
                          this.props.navigation.navigate("Login");
                        }
                      }
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Image
                  style={{
                    width: 22,
                    height: 22,
                    overflow: "hidden",
                    tintColor: "white"
                  }}
                  source={require("./../../assets/Images/logout.png")}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

CustomNavigation.defaultProps = {
  notification: false
};

export default CustomNavigation;
