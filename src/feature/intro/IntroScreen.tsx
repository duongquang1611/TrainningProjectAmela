import React from 'react';
import { View, ImageBackground, SafeAreaView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Images from 'assets/images';
import { StyledButton, StyledText } from 'components/base';
import { navigate } from 'navigation/NavigationService';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { Themes } from 'assets/themes';
// import { useDispatch } from 'react-redux';

const { introImage } = Images.photo;
const IntroScreen = () => {
    // const dispatch = useDispatch();

    const handleLogin = () => {
        navigate(AUTHENTICATE_ROUTE.LOGINAPP);
    };
    const handleRegister = () => {
        navigate(AUTHENTICATE_ROUTE.REGISTERAPP);
    };
    return (
        <View style={styles.container}>
            <ImageBackground source={introImage} style={styles.introBg}>
                <SafeAreaView style={styles.txtIntro}>
                    <StyledText i18nText={'intro.titleIntro'} customStyle={styles.tltIntro} />
                    <StyledText i18nText={'intro.titleIntro_two'} customStyle={styles.tltIntro_two} />
                </SafeAreaView>
                <StyledText i18nText={'intro.txt'} customStyle={styles.tltIntro_three} />
                <StyledButton
                    title={'intro.txtLogin'}
                    onPress={handleLogin}
                    customStyle={styles.txtLog}
                    customStyleText={styles.styleTxt}
                />
                <StyledButton
                    title={'intro.txtRegister'}
                    onPress={handleRegister}
                    customStyle={styles.txtRegister}
                    customStyleText={styles.styleTxt}
                />
                <View style={styles.guestAccount}>
                    <StyledText i18nText={'intro.txtAccount'} customStyle={styles.styleTxt} />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    introBg: {
        width: '100%',
        height: '100%',
    },
    txtIntro: {
        height: '89@s',
        width: '326@s',
        marginTop: '330@vs',
        marginHorizontal: '25@s',
    },
    tltIntro: {
        textAlign: 'center',
        fontSize: '23@s',
        color: Themes.COLORS.white,
    },
    tltIntro_two: {
        fontSize: '40@s',
        color: Themes.COLORS.white,
    },
    tltIntro_three: {
        fontSize: '12@s',
        color: Themes.COLORS.white,
    },
    txtLog: {
        marginTop: '180@vs',
        backgroundColor: Themes.COLORS.selectiveYellow,
    },
    guestAccount: {
        width: '198@s',
        height: '18@vs',
        alignSelf: 'center',
        marginTop: '20@vs',
    },
    txtRegister: {
        marginTop: '20@vs',
        backgroundColor: Themes.COLORS.oxfordBlue,
    },
    styleTxt: {
        color: Themes.COLORS.white,
    },
});

export default IntroScreen;
