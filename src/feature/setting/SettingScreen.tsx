import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
// import { StyleSheet, View } from 'react-native';
// import { StyledButton } from 'components/base';
// import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { ScaledSheet } from 'react-native-size-matters';

const SettingView: FunctionComponent = () => {
    return <View style={styles.container} />;
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        marginHorizontal: '20@ms',
        backgroundColor: 'red',
    },
});

export default SettingView;
