/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Images from 'assets/images';
import { StyledButton, StyledInput, StyledText } from 'components/base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Themes } from 'assets/themes';
import { postSigup } from 'api/modules/api-app/general';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import HeaderLogAndRegister from './HeaderLogAndRegister';

const RegisterTrainingScreen = () => {
    const { introImage } = Images.photo;
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [appear, setAppear] = useState(false);
    const arrAccount: any[] = [];
    const [isLoading, setIsLoading] = useState(false);

    for (let i = 801; i <= 900; i += 1) {
        // arrAccount.push({ username: `long00${i}`, password: '123456' });

        arrAccount.push({ username: `long${i}`, password: '123456' });
    }
    // console.log('arr', arrAccount);
    const postRegister = async () => {
        // if (userName.length > 6 && userName.length < 10) {
        // try {
        //     const res = await postSigup({
        //         username: userName,
        //         password: passWord,
        //     });
        //     console.log(res);
        // } catch (errorMessage) {
        //     console.log(errorMessage);
        // }
        // alert('Đăng kí thành công');
        // } else {
        //     alert('Bạn nhập chưa đủ kí tự');
        // }
        console.log('vào đây');

        // arrAccount &&
        //     arrAccount.map(async item => {
        //         return await postSigup({
        //             username: item.username,
        //             password: item.password,
        //         });
        //     });

        try {
            setIsLoading(true);
            await Promise.all(
                arrAccount.map((item: any) => {
                    return postSigup({
                        username: item.username,
                        password: item.password,
                    });
                }),
            );
        } catch (error) {
            console.log(error);
        } finally {
            console.log(new Date());
            setIsLoading(false);
        }
    };

    // {
    //     arrAccount &&
    //         arrAccount.map(async item => {
    //             return await postSigup({
    //                 username: item.username,
    //                 password: item.password,
    //             });
    //         });
    // }
    const conditionRegister =
        userName.length < 10 && userName.length > 5 && passWord.length < 10 && passWord.length > 5;

    const styledBtn = () => {
        if (!conditionRegister) {
            return 'black';
        }
        return 'green';

        // return 'yellow';
    };

    // const name = arrAccount.forEach((item: any) => console.log(item.username));
    // const pass = arrAccount.forEach((item: any) => console.log(item.password));
    return (
        <>
            <StyledOverlayLoading visible={isLoading} />
            <View style={styles.container}>
                <HeaderLogAndRegister />
                <View style={styles.main}>
                    <StyledText i18nText={'register.title'} customStyle={styles.titleRegister} />
                    <View style={styles.cssInput}>
                        <StyledInput customPlaceHolder="register.name" onChangeText={setUserName} />
                        <StyledInput customPlaceHolder="register.phone" />
                        <StyledInput customPlaceHolder="register.pass" onChangeText={setPassWord} />
                        {(passWord?.length <= 5 || passWord?.length >= 10) && !!passWord?.length && (
                            <StyledText i18nText={'Pass k du ky tu'} customStyle={{ color: 'white' }} />
                        )}
                        <StyledInput customPlaceHolder="register.resetPass" />
                    </View>

                    <View style={styles.footerView}>
                        <StyledButton
                            title={'register.submit'}
                            // customStyle={styles.sub}
                            customStyle={
                                conditionRegister
                                    ? {
                                          backgroundColor: Themes.COLORS.selectiveYellow,
                                      }
                                    : {
                                          backgroundColor: Themes.COLORS.red,
                                      }
                            }
                            onPress={postRegister}
                            // disabled={!conditionRegister}
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
        </>
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
