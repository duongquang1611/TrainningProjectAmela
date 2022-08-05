import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Images from 'assets/images';
import { StyledButton, StyledIcon, StyledImage, StyledInputForm } from 'components/base';
import { Themes } from 'assets/themes';
import { postSigup } from 'api/modules/api-app/general';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { checkIsExistEmail } from 'api/modules/api-app/authenticate';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AlertMessage from '../../components/base/AlertMessage';
import StyledDateTimePicker from '../../components/base/picker/StyledDateTimePicker';
import StyledPicker from '../../components/base/picker/StyledPicker';
import { dataGenderPicker } from '../../utilities/staticData';
import ImagePicker from '../../utilities/upload/ImagePicker';
import StyledHeader from '../../components/common/StyledHeader';

const DEFAULT_FORM = {
    name: 'test001',
    email: 'test@test.com',
    password: 'Long1234',
    gender: 'Nam',
    birthday: '2001-09-06',
    address: 'Dong Anh,Ha Noi',
};
const RegisterTrainingScreen = () => {
    const schema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.password(),
        name: yupValidate.name(),
        gender: yupValidate.gender(),
        birthday: yupValidate.birthday(),
        address: yupValidate.address(),
    });
    const form = useForm({
        mode: 'onChange', // validate form onChange
        defaultValues: DEFAULT_FORM,
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
        handleSubmit,
    } = form;

    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState('');
    const postRegister = async (formData: any) => {
        const convertGender = dataGenderPicker.find((item: any) => item.name === formData.gender);
        try {
            setIsLoading(true);
            const checkResponsiveEmail = await checkIsExistEmail(formData.email);
            if (checkResponsiveEmail.data === true) {
                AlertMessage('Email đã tồn tại trong hệ thống');
            } else {
                await postSigup({
                    ...formData,
                    gender: convertGender?.id,
                    images: [
                        {
                            name: image,
                            isAvatar: 1,
                        },
                    ],
                });
            }
        } catch (error: any) {
            AlertMessage(error);
        } finally {
            setIsLoading(false);
        }

        // try {
        //     setIsLoading(true);
        //     await Promise.all(
        //         arrAccount.map((item: any) => {
        //             return postSigup({
        //                 username: item.username,
        //                 password: item.password,
        //             });
        //         }),
        //     );
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     console.log(new Date());
        //     setIsLoading(false);
        // }
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
    // const conditionRegister =
    //     userName.length < 10 && userName.length > 5 && passWord.length < 10 && passWord.length > 5;

    // const styledBtn = () => {
    //     if (!conditionRegister) {
    //         return 'black';
    //     }
    //     return 'green';

    //     // return 'yellow';
    // };

    return (
        <>
            <StyledHeader title="Register" />
            <StyledOverlayLoading visible={isLoading} />
            <View style={styles.container}>
                <View style={styles.cssAvatar}>
                    {image ? (
                        <View style={styles.cssAvatar}>
                            <StyledImage
                                source={{ uri: `https://aos-app-order-soba-8e35e74.s3.amazonaws.com/${image}` }}
                                customStyle={styles.cssImg}
                            />
                        </View>
                    ) : (
                        <ImagePicker setImage={setImage} image={image}>
                            <StyledIcon customStyle={{ tintColor: 'white' }} source={Images.icons.plus} size={30} />
                        </ImagePicker>
                    )}
                </View>
                {/* <View style={{ width: 100, height: 100, backgroundColor: 'red' }}>
                    <ImagePicker setImage={setImage}>
                        <StyledIcon
                            customStyle={{ marginLeft: 3, tintColor: 'black' }}
                            source={Images.icons.plus}
                            size={30}
                        />
                    </ImagePicker>
                </View> */}
                {/* <View style={styles.main}>
                    <StyledText i18nText={'register.title'} customStyle={styles.titleRegister} />
                    <View style={styles.cssInput}>
                        <StyledInput customPlaceHolder="register.email" onChangeText={setEmailUser} />
                        <StyledInput customPlaceHolder="register.pass" onChangeText={setPassWord} />
                        <StyledInput customPlaceHolder="register.name" onChangeText={setUserName} />
                        <StyledInput customPlaceHolder="register.gender" onChangeText={setGenderUser} />
                        <StyledInput customPlaceHolder="register.birthday" onChangeText={setBirthdayUser} />
                        <StyledInput customPlaceHolder="register.address" onChangeText={setAddressUSer} />
                        {(passWord?.length <= 5 || passWord?.length >= 10) && !!passWord?.length && (
                            <StyledText i18nText={'Pass k du ky tu'} customStyle={{ color: 'white' }} />
                        )}
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
                </View> */}
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    showsVerticalScrollIndicator={false}
                    enableResetScrollToCoords={false}>
                    <FormProvider {...form}>
                        <StyledInputForm name={'email'} label="Email" customStyle={styles.cssTextInput} />
                        <StyledInputForm
                            secureTextEntry={false}
                            name={'password'}
                            label="Password"
                            customStyle={styles.cssTextInput}
                        />
                        <StyledInputForm
                            name={'name'}
                            label="Username"
                            returnKeyType="next"
                            customStyle={styles.cssTextInput}
                        />
                        <StyledInputForm
                            name={'gender'}
                            InputComponent={StyledPicker}
                            dynamicOnChangeName={'onConfirm'}
                            pickerProps={{
                                labelInput: 'Gender', // label UI same StyledInput
                                dataList: dataGenderPicker.map((item: any) => item.name),
                                customStyle: styles.pickerContainer,
                            }}
                        />
                        <StyledInputForm
                            name={'birthday'}
                            label="Birthday"
                            InputComponent={StyledDateTimePicker}
                            customStyle={styles.cssTextInput}
                        />
                        <StyledInputForm name={'address'} label="Address" customStyle={styles.cssTextInput} />
                    </FormProvider>
                    <View style={styles.wrapButton}>
                        <StyledButton
                            onPress={handleSubmit(postRegister)}
                            title={'Submit'}
                            disabled={!isValid}
                            customStyle={[styles.button, !isValid && { backgroundColor: Themes.COLORS.grey }]}
                            customStyleText={{ color: Themes.COLORS.white }}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
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
    cssTextInput: {
        borderWidth: '1@s',
    },
    pickerContainer: {
        marginTop: '10@vs',
        marginHorizontal: '20@s',
        width: '80%',
        marginBottom: '10@vs',
    },
    wrapButton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: '20@s',
    },
    button: {
        backgroundColor: Themes.COLORS.primary,
    },
    cssAvatar: {
        marginTop: '10@s',
        width: '100@s',
        borderRadius: '50@s',
        height: '100@s',
        backgroundColor: Themes.COLORS.black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cssImg: {
        width: '100%',
        borderRadius: '50@s',
        height: '100%',
    },
    cssIconBack: {
        tintColor: Themes.COLORS.white,
    },
});

export default RegisterTrainingScreen;
