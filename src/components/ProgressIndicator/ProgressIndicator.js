
import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Label from '../Label';
import { Color } from '../../utils/color';

class ProgressIndicator extends Component {
  render() {
    return (
      this.props.loading ?
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            style={{ alignSelf: 'center' }}
            color={Color.SUCCESS_COLOR}
            size="large"
          />
          <Label mt={15} xsmall Futura_Book color={Color.SUCCESS_COLOR}>{"Please wait.."}</Label>
        </View> : null
    );
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '110%',
    width: '100%',
    backgroundColor: 'rgba(12, 12, 13, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1
  }
});

export default ProgressIndicator;