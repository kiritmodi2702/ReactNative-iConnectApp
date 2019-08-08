import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Color } from '../utils/color'
import PropTypes from 'prop-types';
import Globle from "../utils/Globals";

class Separator extends Component {
  render() {
    return (
      <View style={
        [styles.containerStyle, {
          backgroundColor: this.props.separatorColor,
        }]} >
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    height: (Globle.Pad.isIpad === 1 ? 0.5 : 1),
    width: '100%'
  }
}

Separator.Default = {
  separatorColor: Color.TEXTFIELD_TITLE
}


export default Separator;
