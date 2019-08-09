/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  Platform,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import Label from "../../components/Label";
import CustomNavigation from "../../components/CustomNavigation";
import styles from "./styles";
import { isIphoneX } from "../../utils/isIphone-x";
const HEADER_SIZE = isIphoneX() ? 135 : 70;
import Globle from "../../utils/Globals";
import { Color } from "../../utils/color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { width, height } = Dimensions.get("window");

const HeightView =
  Dimensions.get("window").height -
  HEADER_SIZE -
  (Platform.OS !== "ios" ? 30 : 0) -
  (Globle.Pad.isIpad === 1 ? 50 : 80);

export default class Strip extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      stripData: [
        {
          baseColor: "#1E90FF",
          title: "Total Hardness (ppm)",
          textValue: "",
          colorAndValue: [
            {
              mainColor: "#6495ED",
              value: 0
            },
            {
              mainColor: "#4682B4",
              value: 110
            },
            {
              mainColor: "#4169E1",
              value: 250
            },
            {
              mainColor: "#8B008B",
              value: 500
            },
            {
              mainColor: "#800080",
              value: 1000
            }
          ]
        },
        {
          baseColor: "#FFFF00",
          title: "Total Chlorine (ppm)",
          textValue: "",
          colorAndValue: [
            {
              mainColor: "#FFD700",
              value: 0
            },
            {
              mainColor: "#F0E68C",
              value: 1
            },
            {
              mainColor: "#EEE8AA",
              value: 3
            },
            {
              mainColor: "#32CD32",
              value: 5
            },
            {
              mainColor: "#228B22",
              value: 10
            }
          ]
        },
        {
          baseColor: "#BA55D3",
          title: "Free Chlorine (ppm)",
          textValue: "",
          colorAndValue: [
            {
              mainColor: "#FFD700",
              value: 0
            },
            {
              mainColor: "#BDB76B",
              value: 1
            },
            {
              mainColor: "#BA55D3",
              value: 3
            },
            {
              mainColor: "#9932CC",
              value: 5
            },
            {
              mainColor: "#800080",
              value: 10
            }
          ]
        },
        {
          baseColor: "#DC143C",
          title: "pH (ppm)",
          textValue: "",
          colorAndValue: [
            {
              mainColor: "#FFA07A",
              value: 6.2
            },
            {
              mainColor: "#E9967A",
              value: 6.8
            },
            {
              mainColor: "#F08080",
              value: 7.2
            },
            {
              mainColor: "#B22222",
              value: 7.8
            },
            {
              mainColor: "#FF0000",
              value: 8.4
            }
          ]
        },
        {
          baseColor: "#228B22",
          title: "Total Alkalinity (ppm)",
          textValue: "",
          colorAndValue: [
            {
              mainColor: "#F4A460",
              value: 0
            },
            {
              mainColor: "#DAA520",
              value: 40
            },
            {
              mainColor: "#2F4F4F",
              value: 120
            },
            {
              mainColor: "#20B2AA",
              value: 180
            },
            {
              mainColor: "#008080",
              value: 240
            }
          ]
        },
        {
          baseColor: "#8B008B",
          title: "Cyanuric Acid (ppm)",
          textValue: "",
          colorAndValue: [
            {
              mainColor: "#DEB887",
              value: 0
            },
            {
              mainColor: "#D2691E",
              value: 50
            },
            {
              mainColor: "#A52A2A",
              value: 100
            },
            {
              mainColor: "#800000",
              value: 150
            },
            {
              mainColor: "#800080",
              value: 300
            }
          ]
        }
      ]
    };
  }
  componentDidMount() {
    console.log("Compoent did mount");
  }

  _keyExtractor = (item, index) => index.toString();

  renderItemSideColor = (item, index) => {
    return (
      <View style={styles.sideColorStyle}>
        <View
          style={{ backgroundColor: item.baseColor, width: "100%", height: 30 }}
        />
      </View>
    );
  };

  onPress = (index, mainIndex) => {
    this.state.stripData[mainIndex].textValue = this.state.stripData[
      mainIndex
    ].colorAndValue[index].value;

    this.setState({
      stripData: this.state.stripData
    });
  };

  _renderItem = (item, index, mainIndex) => {
    return (
      <View style={{ height: 75, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => this.onPress(item.index, mainIndex)}
          style={{
            height: 30,
            width: (width - 130) / 5,
            backgroundColor: item.item.mainColor,
            marginLeft: 10,
            borderRadius: 5
          }}
        />

        <Label
          style={{ marginLeft: 10 }}
          sigleLine={true}
          x12small
          Futura_Book
          color={Color.TEXTFIELD_TITLE}
        >
          {item.item.value}
        </Label>
      </View>
    );
  };

  renderFlatListView = (item, mainIndex) => {
    return (
      <SafeAreaView style={{ height: 120, width: width - 80 }}>
        <View style={styles.flatListItemStyle}>
          <Label
            style={{ marginLeft: 10 }}
            sigleLine={true}
            x12small
            Futura_Medium
            color={Color.TEXTFIELD_TITLE}
          >
            {this.state.stripData[mainIndex].title.toString()}
          </Label>

          <TextInput
            style={styles.textFieldStyle}
            onEndEditing={() => {
              goal = this.state.stripData[mainIndex].textValue;
              let values = this.state.stripData[mainIndex].colorAndValue.map(
                item => item.value
              );
              var closest = values.reduce(function (prev, curr) {
                return Math.abs(curr - goal) < Math.abs(prev - goal)
                  ? curr
                  : prev;
              });
              this.state.stripData[mainIndex].textValue = closest;
              this.setState({
                stripData: this.state.stripData
              });
            }}
            onChangeText={text => {
              console.log("This is called");
              this.state.stripData[mainIndex].textValue = text;
              this.setState({
                stripData: this.state.stripData
              });
            }}
            keyboardType="number-pad"
            value={this.state.stripData[mainIndex].textValue.toString()}
          />
        </View>
        <FlatList
          style={{ height: 75 }}
          horizontal={true}
          data={item.colorAndValue}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={(item, index) => this._renderItem(item, index, mainIndex)}
        />
      </SafeAreaView>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <CustomNavigation
          navigationTitle="Strip"
          isNext={true}
          nextClick={() => {
            let allData = this.state.stripData
              .map(item => {
                return item.title + " : " + item.textValue;
              })
              .join("\n");

            Alert.alert(
              "iConnect",
              allData,
              [
                {
                  text: "OK",
                  onPress: () => {
                    console.log("Profile has been successfully updated.");
                  }
                }
              ],
              { cancelable: false }
            );
          }}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAwareScrollView style={{ marginTop: 20 }}>
            <View
              style={{
                height: 120 * this.state.stripData.length,
                width: width - 40,
                alignSelf: "center",
                flexDirection: "row"
              }}
            >
              <View style={styles.itemStyleSide}>
                {this.state.stripData.map((item, index) => {
                  return this.renderItemSideColor(item, index);
                })}
              </View>
              <View
                style={{
                  height: 120 * this.state.stripData.length,
                  width: width - 80,
                  alignSelf: "center"
                }}
              >
                {this.state.stripData.map((item, index) => {
                  return this.renderFlatListView(item, index);
                })}
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
