import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Color } from "./../../utils/color";
import Label from "./../Label";
import Separator from "./../Separator";
import {
  fontXSmall,
  fontSmall,
  fontNormal,
  fontLarge,
  fontXLarge
} from "./../../utils/theme";
import PropTypes from "prop-types";
import Globle from "./../../utils/Globals";
import styles from "./styles";

import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import championFontConfige from "./../../../selection.json";
const Icon = createIconSetFromIcoMoon(championFontConfige);

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isvisible: props.secureTextEntry
    };
  }

  hideShowEvent = () => {
    if (this.state.isvisible) {
      this.setState({
        isvisible: false
      });
    } else {
      this.setState({
        isvisible: true
      });
    }
  };

  render() {
    var txtFieldColor = this.props.isError
      ? Color.ERROR_COLOR
      : this.props.value.length > 0
      ? Color.SUCCESS_COLOR
      : Color.TEXTFIELD_TITLE;
    var separatorColor = this.props.isError
      ? Color.ERROR_COLOR
      : this.props.value.length > 0
      ? Color.SUCCESS_COLOR
      : Color.SEPERATOR;

    return (
      <View
        style={[
          styles.fieldViewStyle,
          { width: this.props.width, justifyContent: "space-between" }
        ]}
      >
        <Label xsmall Futura_Book color={txtFieldColor}>
          {this.props.title}
        </Label>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={[
              styles.fieldStyle,
              { width: this.props.width - 40 },
              this.props.style
            ]}
            secureTextEntry={this.state.isvisible}
            returnKeyType={this.props.returnKeyType}
            maxLength={this.props.maxLength}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            autoCorrect={false}
            autoCapitalize={this.props.autoCapitalize}
            keyboardType={this.props.keyboardType}
            editable={this.props.editable}
            maxLength={this.props.maxLength}
            returnKeyType={this.props.returnKeyType}
            ref={this.props.refInner}
            autoCorrect={false}
            onSubmitEditing={this.props.onSubmitEditing}
            onFocus={this.props.onFocus}
            onEndEditing={this.props.onEndEditing}
          />
          <Icon
            name={"down_arrow"}
            style={{ color: txtFieldColor, fontSize: 20, alignSelf: "center" }}
          />

          <TouchableOpacity
            disabled={this.props.disabled}
            onPress={this.props.onPress}
            style={{ width: "100%", height: "100%", position: "absolute" }}
          />
        </View>
        <Separator separatorColor={separatorColor} />
      </View>
    );
  }
}

DropDown.defaultProps = {
  title: "",
  separatorColor: Color.TEXTFIELD_TITLE,
  width: Dimensions.get("window").width - 40
};
DropDown.propTypes = {
  title: PropTypes.string,
  sideImage: PropTypes.any,
  isError: PropTypes.bool
};

export default DropDown;
