/* eslint-disable @typescript-eslint/no-unused-vars */
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledImage, StyledInput, StyledText } from 'components/base';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import StyledHeader from '../../components/common/StyledHeader';

GoogleSignin.configure({
    webClientId: '704562620865-la7rpl689l6nidbsah0o2egcd9ddjktf.apps.googleusercontent.com',
});
const LoginTrainingScreen = () => {
    const { requestLogin, loading } = useLogin();
    const [login, setLogin] = useState('');
    const [passwordLog, setPassword] = useState('');
    const { introImage } = Images.photo;
    const arrAccount: any[] = [];
    const [dataGogle, setDataGogle] = useState();

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
    // Settings.setAppID('APP ID');
    const handleLoginGogoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo', userInfo);
            setDataGogle(userInfo);
        } catch (error) {
            console.log('err', error);

            // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            //     // user cancelled the login flow
            // } else if (error.code === statusCodes.IN_PROGRESS) {
            //     // operation (e.g. sign in) is in progress already
            // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            //     // play services not available or outdated
            // } else {
            //     // some other error happened
            // }
        }
    };
    console.log(dataGogle);

    // const propertyNames = Object.keys(dataGogle);
    // console.log(propertyNames);

    // let result = Object.entries(dataGogle);
    // console.log('ressyl', result);

    return (
        <View style={styles.container}>
            <StyledHeader title="Login" />
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
                                email: login,
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
                <LoginButton
                    onLoginFinished={(error: any, result: any) => {
                        if (error) {
                            console.log(`login has error: ${result.error}`);
                        } else if (result.isCancelled) {
                            console.log('login is cancelled.');
                        } else {
                            AccessToken.getCurrentAccessToken().then((data: any) => {
                                console.log(data.accessToken.toString());
                            });
                        }
                    }}
                    onLogoutFinished={() => console.log('logout.')}
                />
                <StyledButton title="Login gogle" onPress={handleLoginGogoogle} />
                <View
                    style={{
                        width: '100%',
                        height: 300,
                        backgroundColor: 'pink',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <StyledText originValue={`name :${dataGogle?.user?.name}`} customStyle={{ color: 'black' }} />
                    <StyledText originValue={`id_user :${dataGogle?.user?.id}`} customStyle={{ color: 'black' }} />
                    <StyledText originValue={`email :${dataGogle?.user?.email}`} customStyle={{ color: 'black' }} />
                    <View style={{ width: 80, height: 80, alignSelf: 'center' }}>
                        <StyledImage
                            source={{
                                uri: dataGogle?.user?.photo,
                            }}
                            customStyle={styles.cssAnh}
                        />
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
    cssAnh: {
        width: '100%',
        height: '100%',
    },
});

export default LoginTrainingScreen;
