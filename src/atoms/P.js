import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Font, Pantone } from "src/components/utils";


const P = (props) => {
    const { txtColor, fSize, aling, txtUpper } = props;

    const colorTxt = txtColor ? txtColor : "#fff";
    const txtUppercase = txtUpper ? txtUpper : 'none';
    const fontSizes = fSize ? fSize : 13;
    const alingTxt = aling ? aling : 'left';

    const Stylep = { color: colorTxt, fontSize: fontSizes, textAlign: alingTxt, textTransform: txtUppercase };

    return (

        <Text style={{ ...styles.textPar, ...props.style, ...Stylep }}>
            {props.children}
        </Text>

    );
}

const styles = StyleSheet.create({
    textPar: {
    }

});
export default P;