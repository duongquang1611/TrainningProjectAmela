/* eslint-disable @typescript-eslint/no-unused-vars */
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInput, StyledText } from 'components/base';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import HeaderLogAndRegister from './HeaderLogAndRegister';

const LoginTrainingScreen = () => {
    const { requestLogin, loading } = useLogin();
    const [login, setLogin] = useState('');
    const [passwordLog, setPassword] = useState('');
    const { introImage } = Images.photo;
    const arrAccount: any[] = [];

    // for (let i = 4; i <= 100; i += 1) {
    //     // arrAccount.push({ username: `long00${i}`, password: '123456' });
    //     if (i > 99) {
    //         arrAccount.push({ username: `long${i}`, password: '123456' });
    //     } else if (i >= 10) {
    //         arrAccount.push({ username: `long0${i}`, password: '123456' });
    //     } else {
    //         arrAccount.push({ username: `long00${i}`, password: '123456' });
    //     }
    // }

    // const name = arrAccount.forEach((item: any) => console.log(item.username));
    // const pass= arrAccount.forEach((item: any) => console.log(item.password));
    return (
        <View style={styles.container}>
            <HeaderLogAndRegister />
            <View style={styles.main}>
                <StyledText i18nText={'login.titleRegister'} customStyle={styles.titleRegister} />
                <View style={styles.cssInput}>
                    <StyledInput
                        customPlaceHolder="login.content"
                        value={login}
                        onChangeText={(text: string) => setLogin(text)}
                    />
                    <StyledInput
                        customPlaceHolder="login.pass"
                        value={passwordLog}
                        onChangeText={(text: string) => setPassword(text)}
                    />
                </View>
                <StyledText i18nText={'login.forget'} customStyle={styles.forget} />
                <View style={styles.footerView}>
                    <StyledButton
                        title={'login.sub'}
                        customStyle={styles.sub}
                        onPress={() => {
                            requestLogin({
                                username: login,
                                password: passwordLog,
                            });
                        }}
                    />
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
        backgroundColor: 'black',
    },
    titleRegister: {
        color: Themes.COLORS.white,
        marginTop: '37@s',
        marginLeft: '24@s',
    },
    cssInput: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '36@s',
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

export default LoginTrainingScreen;
