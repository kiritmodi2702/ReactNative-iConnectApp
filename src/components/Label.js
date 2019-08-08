import React from "react";
import { Text, Platform } from "react-native";
import { Color } from "../utils/color";
import {
  fontXSmall,
  fontX12Small,
  fontSmall,
  fontNormal,
  fontLarge,
  fontXLarge,
  fontX10Small
} from "../utils/theme";
import PropTypes from "prop-types";

class Label extends React.Component {
  onClick = () => {
    if (this.props.onPress) this.props.onPress();
  };

  render() {
    let stylesArray = [];
    if (this.props.xlarge) stylesArray.push({ fontSize: fontXLarge });
    else if (this.props.large) stylesArray.push({ fontSize: fontLarge });
    else if (this.props.normal) stylesArray.push({ fontSize: fontNormal });
    else if (this.props.small) stylesArray.push({ fontSize: fontSmall });
    else if (this.props.xsmall) stylesArray.push({ fontSize: fontXSmall });
    else if (this.props.x12small) stylesArray.push({ fontSize: fontX12Small });
    else if (this.props.x10small) stylesArray.push({ fontSize: fontX10Small });
    else stylesArray.push({ fontSize: fontNormal });

    if (this.props.Futura_Book)
      stylesArray.push({ fontFamily: "FuturaBT-Book" });
    else if (this.props.Futura_Light)
      stylesArray.push({ fontFamily: "FuturaBT-Light" });
    else if (this.props.Futura_Medium)
      stylesArray.push({ fontFamily: "Futura-Medium" });
    else if (this.props.Futura_Heavy)
      stylesArray.push({ fontFamily: "FuturaBT-Heavy" });
    else stylesArray.push({ fontFamily: "FuturaBT-Book" });

    stylesArray.push({
      color: this.props.color,
      marginTop: this.props.mt,
      marginBottom: this.props.mb,
      marginLeft: this.props.ml,
      marginRight: this.props.mr,
      textAlign: this.props.align,
      textDecorationLine: this.props.textDecorationLine
    });
    stylesArray.push(this.props.style);

    return (
      <Text
        numberOfLines={this.props.sigleLine ? 1 : this.props.numberOfLines}
        style={stylesArray}
        onPress={this.props.onPress ? this.onClick : null}
        ellipsizeMode={this.props.ellipsizeMode}
      >
        {this.props.children}
      </Text>
    );
  }
}

Label.defaultProps = {
  x10small: false,
  x12small: false,
  xsmall: false,
  small: false,
  normal: false,
  large: false,
  xlarge: false,
  bold: false,
  bolder: false,
  lighter: false,
  light: false,
  sigleLine: false,
  color: Color.GREY_DARK,
  Futura_Heavy: false,
  Futura_Book: false,
  Futura_Medium: false,
  Futura_Light: false,
  mt: 0,
  mb: 0,
  ml: 0,
  mr: 0,
  textDecorationLine: "none"
};
Label.propTypes = {
  x12small: PropTypes.bool,
  x10small: PropTypes.bool,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  normal: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  bold: PropTypes.bool,
  bolder: PropTypes.bool,
  light: PropTypes.bool,
  lighter: PropTypes.bool,
  color: PropTypes.string,
  Futura_Book: PropTypes.bool,
  Futura_Heavy: PropTypes.bool,
  Futura_Medium: PropTypes.bool,
  Futura_Light: PropTypes.bool,
  sigleLine: PropTypes.bool,
  mt: PropTypes.number,
  mb: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  align: PropTypes.string
};
export default Label;
