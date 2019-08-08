import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Color } from '../utils/color'
import PropTypes from 'prop-types';
import Label from '../components/Label'


class CheckBoxCustom extends React.Component {

  onPress = () =>{
    this.props.onPress()
  }

  render() {
    let { height , width } = this.props

    let image = this.props.isChecked ? require('../assets/Images/checked.png') : require('../assets/Images/unChecked.png')
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity onPress={this.onPress} style= {{width: 25 , height: 25 , alignItems: 'center' , justifyContent: 'flex-start'}}>
          <Image
            style = {{width : this.props.isChecked ? 25 : 20 , height : 20}}
            source={image} />
        </TouchableOpacity>
        <Label xsmall Quicksand_Bold style={{marginLeft: 10 , marginRight: 20}}>{this.props.title}</Label>
      </View>
    );
  }
}

CheckBoxCustom.propTypes ={
  isChecked : PropTypes.bool,
  title : PropTypes.string
}

const styles = {
  containerStyle : {
    height : 40,
    flexDirection : 'row',
    alignItems : 'flex-start',
    marginLeft : 20,
    marginRight : 20,
  }
}

export default CheckBoxCustom;
