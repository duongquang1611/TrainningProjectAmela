/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Images from 'assets/images';
import { StyledButton, StyledInput, StyledText } from 'components/base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Themes } from 'assets/themes';
import HeaderLogAndRegister from './HeaderLogAndRegister';

const RegisterTrainingScreen = () => {
    const { introImage } = Images.photo;
    return (
        <View style={styles.container}>
            <HeaderLogAndRegister />
            <View style={styles.main}>
                <StyledText i18nText={'register.title'} customStyle={styles.titleRegister} />
                <View style={styles.cssInput}>
                    <StyledInput customPlaceHolder="register.name" />
                    <StyledInput customPlaceHolder="register.phone" />
                    <StyledInput customPlaceHolder="register.pass" />
                    <StyledInput customPlaceHolder="register.resetPass" />
                </View>
                <View style={styles.footerView}>
                    <StyledButton title={'register.submit'} customStyle={styles.sub} />
                    <View style={styles.txtFooter}>
                        <StyledText i18nText={'login.bottom'} customStyle={styles.txtRegister} />
                        <TouchableOpacity>
                            <StyledText i18nText={'login.atHere'} customStyle={styles.atHere} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        backgroundColor: Themes.COLORS.black,
    },
    titleRegister: {
        color: Themes.COLORS.white,
        marginTop: '37@s',
        marginLeft: '24@s',
    },
    cssInput: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '24@vs',
    },
    forget: {
        color: Themes.COLORS.white,
        marginLeft: '219@s',
        marginTop: '15@vs',
    },
    sub: {
        backgroundColor: Themes.COLORS.selectiveYellow,
    },
    footerView: {
        position: 'absolute',
        bottom: '63@vs',
        left: '24@ms',
    },
    txtRegister: {
        color: Themes.COLORS.white,
    },
    txtFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '16@vs',
    },
    atHere: {
        color: Themes.COLORS.blue,
        fontSize: '14@s',
    },
});

export default RegisterTrainingScreen;
