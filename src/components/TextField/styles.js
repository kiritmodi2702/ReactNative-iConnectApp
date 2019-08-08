import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { Color } from "../../utils/color"
import { largeCutoff, mediumCutoff } from "./../../utils/theme"
import { fontXSmall, fontSmall, fontNormal, fontLarge, fontXLarge } from './../../utils/theme';
import Globle from "./../../utils/Globals";

let textStyle = {
    fieldStyle: {
        fontSize: fontSmall,
        fontFamily: "FuturaBT-Book",
        color: Color.TEXTFIELD_TITLE,
        height: 35,
        padding: 0,
        color: Color.TEXTFIELD_TEXT
    },
    fieldViewStyle: {
        marginTop: 15,
    },
    passwordIcon: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
}


const screenDims = Dimensions.get("screen")
if (screenDims.height > largeCutoff) {
    //large

} else if (screenDims.height > mediumCutoff) {
    //medium

} else {
    //small
    textStyle.fieldViewStyle.marginTop = 10
    textStyle.fieldStyle.height = 30


}
//@ts-ignore
const styles = StyleSheet.create(textStyle);

export default styles;
