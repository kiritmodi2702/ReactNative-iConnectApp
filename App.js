/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";

import { StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";

import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Label from "./src/components/Label";
import Login from "./src/layouts/Login";
import SignUp from "./src/layouts/SignUp";
import Profile from "./src/layouts/Profile";
import VideoLists from "./src/layouts/VideoLists";
import Strip from "./src/layouts/Strip";

import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import championFontConfige from "./selection.json";
import { fontLarge } from "./src/utils/theme";
import { Color } from "./src/utils/color";

const Icon = createIconSetFromIcoMoon(championFontConfige);

import Globle from "./src/utils/Globals";

console.reportErrorsAsExceptions = false;
console.disableYellowBox = true;

const TabBarNavigator = createBottomTabNavigator(
  {
    VideoLists: {
      screen: VideoLists,
      showLabel: true,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => {
          let color = !focused ? Color.MENU_DESELECT : Color.BUTTON_BLUE_TEXT;
          return <Icon size={fontLarge} name="play" color={color} />;
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Label x10small color={Color.TEXTFIELD_TITLE}>
              Videos
            </Label>
          );
        }
      })
    },

    Strip: {
      screen: Strip,
      showLabel: true,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => {
          let color = !focused ? Color.MENU_DESELECT : Color.BUTTON_BLUE_TEXT;
          return <Icon size={fontLarge} name="info" color={color} />;
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Label x10small color={Color.TEXTFIELD_TITLE}>
              Strip
            </Label>
          );
        }
      })
    },

    Profile: {
      screen: Profile,
      showLabel: true,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => {
          let color = !focused ? Color.MENU_DESELECT : Color.BUTTON_BLUE_TEXT;
          return <Icon size={fontLarge} name="profile" color={color} />;
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Label x10small color={Color.TEXTFIELD_TITLE}>
              Profile
            </Label>
          );
        }
      })
    }
  },
  {
    tabBarOptions: {
      tabStyle: {},
      labelStyle: {},
      style: {
        zIndex: -1,
        paddingVertical: 5,
        height: Globle.Pad.isIpad === 1 ? 50 : 80
      },
      tabStyle: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      },
      labelStyle: {
        marginLeft: 0
      }
    },
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

const AuthNavigation = createStackNavigator(
  {
    Login: {
      screen: Login,
      key: "Login",
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SignUp: {
      screen: SignUp,
      key: "SignUp",
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    TabBarNavigator: TabBarNavigator
  },
  {
    headerMode: "none",
    mode: "card",
    backBehavior: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

const MainNavigation = createSwitchNavigator(
  {
    Login: AuthNavigation
  },
  {
    headerMode: "none",
    mode: "card",
    backBehavior: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

const RootNavigator = createAppContainer(MainNavigation);

const RootNavigatorTab = createAppContainer(TabBarNavigator);

class App extends Component<Props> {
  render() {
    if (Object.keys(this.props.userData).length > 0) {
      return <RootNavigatorTab />;
    } else {
      return <RootNavigator />;
    }
  }
}

const mapStateToProps = state => {
  if (state === undefined) {
    return {};
  }
  return {
    userData: state.UserReducer.userData
  };
};
export default connect(mapStateToProps)(App);
