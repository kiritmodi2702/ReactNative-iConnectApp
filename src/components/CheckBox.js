import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Color } from "./../utils/color";
import PropTypes from "prop-types";
import Label from "./../components/Label";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import championFontConfige from "./../../selection.json";
const Icon = createIconSetFromIcoMoon(championFontConfige);

class CheckBox extends React.Component {
  render() {
    let { height, width } = this.props;

    let image = this.props.isChecked ? "check" : "uncheck";

    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity
          disabled={this.props.disabled}
          onPress={this.props.onCheckPress}
          style={{
            width: 25,
            height: 25,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon
            name={image}
            style={{
              color: Color.TEXTFIELD_TITLE,
              fontSize: 20,
              alignSelf: "center"
            }}
          />
        </TouchableOpacity>
        <Label xsmall Quicksand_Bold style={{ alignSelf: "center" }}>
          {this.props.title}
        </Label>
      </View>
    );
  }
}

CheckBox.propTypes = {
  isChecked: PropTypes.bool,
  title: PropTypes.string
};

const styles = {
  containerStyle: {
    height: 25,
    flexDirection: "row"
  }
};

export default CheckBox;
