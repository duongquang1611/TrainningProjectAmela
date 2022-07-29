import { putPass } from 'api/modules/api-app/general';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledText, StyledButton, StyledInput, StyledTouchable } from 'components/base';
import React, { useState } from 'react';
import { Alert, ImageBackground, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import i18next from 'i18next';

const USERNAME_MIN_LENGTH = 5;
const USERNAME_MAX_LENGTH = 20;

const yupValidate = {
    password: () =>
        yup
            .string()
            .required('Require Old-Pass')
            .min(USERNAME_MIN_LENGTH, i18next.t('error.nameLength'))
            .max(USERNAME_MAX_LENGTH, i18next.t('error.nameLength')),

    newPassWord: () =>
        yup
            .string()
            .required(() => 'Require New-Pass')
            .min(USERNAME_MIN_LENGTH, i18next.t('error.nameLength'))
            .max(USERNAME_MAX_LENGTH, i18next.t('error.nameLength')),
};

const SettingView = () => {
    const { introImage } = Images.photo;
    const [hiddenOldPass, setHiddenOldPass] = useState(true);
    const [hiddenNewPass, setHiddenNewPass] = useState(true);

    const putChangePass = async (data: any) => {
        try {
            await putPass({
                oldPassword: data.oldPass,
                newPassword: data.newPass,
            });
            Alert.alert('Thành công');
        } catch (errorMessage: any) {
            Alert.alert(errorMessage);
        }
    };
    const schema = yup.object().shape({
        oldPass: yupValidate.password(),
        newPass: yupValidate.newPassWord(),
    });
    const { control, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });
    return (
        <View style={styles.container}>
            <ImageBackground source={introImage} style={styles.introBg}>
                <StyledText originValue="Change Password" customStyle={styles.cssTitle} />
                <View style={styles.content}>
                    <View style={styles.boxInput}>
                        <View style={styles.cssboxInput}>
                            <Controller
                                control={control}
                                name="oldPass"
                                rules={{
                                    required: 'Old-PassWord is require',
                                    minLength: { value: 3, message: 'Old_Pass tối thiểu 3 kí tự' },
                                    maxLength: { value: 10, message: 'Old_Pass nhập quá !' },
                                }}
                                render={({ field: { value, onChange }, fieldState: { error } }) => {
                                    return (
                                        <>
                                            <View
                                                style={[
                                                    styles.cssinputPass,
                                                    { borderWidth: 3, borderColor: error ? 'red' : 'green' },
                                                ]}>
                                                <StyledInput
                                                    customPlaceHolder="Nhập mật khẩu cũ..."
                                                    customStyle={styles.cssInput}
                                                    value={value}
                                                    onChangeText={onChange}
                                                    // onBlur={onBlur}
                                                    secureTextEntry={hiddenOldPass}
                                                    errorMessage={error?.message}
                                                />
                                            </View>
                                        </>
                                    );
                                }}
                            />
                        </View>
                        <View style={styles.showPass}>
                            <StyledTouchable onPress={() => setHiddenOldPass(!hiddenOldPass)}>
                                <StyledText originValue={hiddenOldPass ? 'show' : 'hide'} />
                            </StyledTouchable>
                        </View>
                    </View>
                    <View style={styles.boxInput}>
                        <View style={styles.cssboxInput}>
                            <Controller
                                control={control}
                                name="newPass"
                                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                                    <>
                                        <View
                                            style={[
                                                styles.cssinputPass,
                                                {
                                                    borderWidth: 3,
                                                    borderColor: error ? 'red' : 'green',
                                                },
                                            ]}>
                                            <StyledInput
                                                customPlaceHolder="Nhập mật khẩu cần thay đổi..."
                                                customStyle={styles.cssInput}
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                secureTextEntry={hiddenNewPass}
                                                errorMessage={error?.message}
                                            />
                                        </View>
                                    </>
                                )}
                            />
                        </View>
                        <View style={styles.showPass}>
                            <StyledTouchable onPress={() => setHiddenNewPass(!hiddenNewPass)}>
                                <StyledText originValue={hiddenNewPass ? 'show' : 'hide'} />
                            </StyledTouchable>
                        </View>
                    </View>
                </View>
                <StyledButton
                    title="Change Pass"
                    customStyle={styles.cssBtnChange}
                    onPress={handleSubmit(putChangePass)}
                />
            </ImageBackground>
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    boxInput: {
        flexDirection: 'row',
        backgroundColor: Themes.COLORS.LightGray,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        marginTop: '180@vs',
    },
    introBg: {
        width: '100%',
        height: '100%',
    },
    cssboxInput: {
        width: '80%',
    },
    cssInput: {
        width: '100%',
    },
    showPass: {
        width: '50@s',
        height: '50%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20@s',
    },
    cssTitle: {
        textAlign: 'center',
        fontSize: '25@s',
        color: Themes.COLORS.black,
        marginTop: '100@s',
    },
    cssBtnChange: {
        width: '30%',
        borderRadius: '10@s',
    },
    cssinputPass: {
        width: '100%',
        height: '60@s',
        justifyContent: 'center',
    },
});

export default SettingView;
