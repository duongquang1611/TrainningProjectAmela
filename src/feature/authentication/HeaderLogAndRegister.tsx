import { Themes } from 'assets/themes';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const HeaderLogAndRegister = () => {
    return <View style={styles.container} />;
};

const styles = ScaledSheet.create({
    container: {
        width: '375@s',
        height: '100@vs',
        backgroundColor: Themes.COLORS.ebonyClay,
    },
});

export default HeaderLogAndRegister;
