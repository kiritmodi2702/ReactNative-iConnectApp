import React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Color } from './../utils/color';
import Label from './../components/Label'
import { fontXSmall, fontSmall, fontNormal, fontLarge, fontXLarge } from './../utils/theme';
import PropTypes from 'prop-types';

class KMButton extends React.Component {

    onClick = () => {
        if (this.props.onPress)
            this.props.onPress();
    };

    render() {
        let stylesArray = [];

        if (this.props.xlarge)
            stylesArray.push({ fontSize: fontXLarge });
        else if (this.props.large)
            stylesArray.push({ fontSize: fontLarge });
        else if (this.props.normal)
            stylesArray.push({ fontSize: fontNormal });
        else if (this.props.small)
            stylesArray.push({ fontSize: fontSmall });
        else if (this.props.xsmall)
            stylesArray.push({ fontSize: fontXSmall });
        else
            stylesArray.push({ fontSize: fontNormal });

        if (this.props.Futura_Book)
            stylesArray.push({ fontFamily: "FuturaBT-Book" });
        else if (this.props.Futura_Light)
            stylesArray.push({ fontFamily: "FuturaBT-Light" });
        else if (this.props.Futura_Medium)
            stylesArray.push({ fontFamily: "Futura-Medium" });
        else if (this.props.Futura_Heavy)
            stylesArray.push({ fontFamily: "FuturaBT-Heavy" });
        else
            stylesArray.push({ fontFamily: "FuturaBT-Light" });


        return (
            <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPress} style={[styles.buttonStyle, this.props.style]}>
                {this.props.title && <Label x12small Futura_Medium color={this.props.color} style={[stylesArray, this.props.textStyle]}>
                    {this.props.title}
                </Label>}
                {this.props.imageBack && <Image
                    style={{ width: 9, height: 8, alignSelf: 'center' }}
                    source={this.props.imageBack} />}
            </TouchableOpacity>
        );
    }
}


KMButton.defaultProps = {
    xsmall: false,
    small: false,
    normal: false,
    large: false,
    xlarge: false,
    Futura_Heavy: false,
    Futura_Book: false,
    Futura_Medium: false,
    Futura_Light: false,
};
KMButton.propTypes = {
    xsmall: PropTypes.bool,
    small: PropTypes.bool,
    normal: PropTypes.bool,
    large: PropTypes.bool,
    xlarge: PropTypes.bool,
    Futura_Book: PropTypes.bool,
    Futura_Heavy: PropTypes.bool,
    Futura_Medium: PropTypes.bool,
    Futura_Light: PropTypes.bool,
};


const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Color.GREEN_DARK,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default KMButton;
