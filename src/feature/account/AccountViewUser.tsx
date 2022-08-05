import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { ScaledSheet } from 'react-native-size-matters';
import { View } from 'react-native';
import { StyledButton, StyledIcon, StyledImage, StyledInputForm, StyledText } from 'components/base';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app-redux/hooks';
import { putEditProfile } from 'api/modules/api-app/general';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { getProfile } from 'api/modules/api-app/authenticate';
import yupValidate from 'utilities/yupValidate';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StyledDateTimePicker from '../../components/base/picker/StyledDateTimePicker';
import { dataGenderPicker, linkIMG } from '../../utilities/staticData';
import StyledPicker from '../../components/base/picker/StyledPicker';
import StyledHeader from '../../components/common/StyledHeader';
import ImagePicker from '../../utilities/upload/ImagePicker';
import Images from '../../assets/images';
import StyledOverlayLoading from '../../components/base/StyledOverlayLoading';

const DEFAULT_FORM = {
    name: 'Long',
    gender: 'Nam',
    birthday: '2001-09-06',
};
const AccountViewUser = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.userInfo);
    const [image, setImage] = useState('');
    const lengthArrImg = user?.images.length;
    const imageAfterProfile = user?.images[lengthArrImg - 1].name.split('/');
    const [isLoading, setIsLoading] = useState(false);
    const schema = yup.object().shape({
        name: yupValidate.name(),
        gender: yupValidate.gender(),
        birthday: yupValidate.birthday(),
    });
    const form = useForm({
        mode: 'onChange',
        defaultValues: DEFAULT_FORM,
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError',
    });
    const {
        formState: { isValid },
        handleSubmit,
    } = form;
    const handleEditProfile = async (formData: any) => {
        const convertGender = dataGenderPicker.find((item: any) => item.name === formData.gender);
        try {
            setIsLoading(true);
            await putEditProfile({
                ...formData,
                gender: convertGender?.id,
                images: [
                    {
                        name: image,
                        isAvatar: 1,
                    },
                    {
                        name: image,
                        isAvatar: 0,
                    },
                ],
            });
            handleGetProfile();
        } catch (error: any) {
            console.log('err', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleGetProfile = async () => {
        try {
            const dataProfile = await getProfile();
            dispatch(userInfoActions.getUserInfoSuccess(dataProfile.data));
        } catch (error: any) {
            console.log(error);
        }
    };

    const StyledEditProfile = ({ title, content }: any) => {
        return (
            <View style={styles.cssProfile}>
                <View style={styles.cssTitleProfile}>
                    <View>
                        <StyledText originValue={`${title} : `} customStyle={{ color: 'red' }} />
                    </View>
                </View>
                <View style={styles.cssContentProfile}>
                    <StyledText originValue={`${content}`} />
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.cssTopHeader}>
                <View style={styles.cssHeader}>
                    <StyledHeader title="Profile" />
                </View>
                <View style={styles.cssAvatar}>
                    <StyledImage
                        source={{
                            uri: `${linkIMG}${imageAfterProfile[imageAfterProfile.length - 1]}`,
                        }}
                        customStyle={styles.cssImg}
                    />
                </View>
                <View style={styles.boxGetProfile}>
                    <StyledEditProfile title="ID" content={`${user?.id}`} />
                    <StyledEditProfile title="Email" content={`${user?.email}`} />
                    <StyledEditProfile title="Name" content={`${user?.name}`} />
                    <StyledEditProfile title="Birth Day" content={`${user?.birthday}`} />
                    <StyledEditProfile title="Address" content={`${user?.address}`} />
                </View>
            </View>

            <View style={styles.cssBody}>
                <StyledOverlayLoading visible={isLoading} />
                <KeyboardAwareScrollView contentContainerStyle={styles.containerForm}>
                    <StyledText originValue="Update Profile" customStyle={styles.cssTitle} />
                    <View style={styles.cssAvatar}>
                        {image ? (
                            <View style={styles.cssAvatarImg}>
                                <StyledImage source={{ uri: `${linkIMG}${image}` }} customStyle={styles.cssImg} />
                            </View>
                        ) : (
                            <View style={styles.cssAvatarImgUpdate}>
                                <StyledImage
                                    source={{ uri: `${linkIMG}${imageAfterProfile[imageAfterProfile.length - 1]}` }}
                                    customStyle={styles.cssImg}
                                />
                                <ImagePicker setImage={setImage} image={image}>
                                    <StyledIcon customStyle={styles.cssIcon} source={Images.icons.plus} size={30} />
                                </ImagePicker>
                            </View>
                        )}
                    </View>
                    <FormProvider {...form}>
                        <View style={styles.cssBoxName}>
                            <StyledInputForm
                                name={'name'}
                                label="Username"
                                returnKeyType="next"
                                customStyle={styles.cssTextInput}
                            />
                        </View>
                        <StyledInputForm
                            name={'gender'}
                            InputComponent={StyledPicker}
                            dynamicOnChangeName={'onConfirm'}
                            pickerProps={{
                                labelInput: 'Gender',
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
                    </FormProvider>
                    <View style={styles.wrapButton}>
                        <StyledButton
                            onPress={handleSubmit(handleEditProfile)}
                            title={'Submit'}
                            disabled={!isValid}
                            customStyle={[styles.button, !isValid && { backgroundColor: Themes.COLORS.grey }]}
                            customStyleText={{ color: Themes.COLORS.white }}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: '150@s',
        backgroundColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5@vs',
        borderRadius: '5@s',
    },
    cssTitle: {
        fontSize: '20@s',
        textAlign: 'center',
        fontWeight: 'bold',
        color: Themes.COLORS.darkOrange,
    },
    boxGetProfile: {
        width: '70%',
        height: '30%',
        flexDirection: 'column',
        borderBottomWidth: '2@s',
        borderTopWidth: '2@s',
        justifyContent: 'space-around',
        marginVertical: '5@s',
    },
    cssHeader: {
        width: '100%',
    },
    cssAvatar: {
        width: '100@s',
        borderRadius: '50@s',
        height: '100@vs',
        backgroundColor: Themes.COLORS.black,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '5@vs',
    },
    cssImg: {
        width: '100%',
        borderRadius: '50@s',
        height: '100%',
        position: 'absolute',
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
    containerForm: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    cssAvatarImg: {
        width: '100%',
        height: '100%',
    },
    cssProfile: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cssTitleProfile: {
        width: '30%',
    },
    cssContentProfile: {
        width: '50%',
    },
    cssTopHeader: {
        flex: 1.5,
        alignItems: 'center',
    },
    cssBody: {
        flex: 2.2,
    },
    cssBoxName: {
        marginTop: '-20@vs',
    },
    cssAvatarImgUpdate: {
        width: '100%',
        height: '100%',
    },
    cssIcon: {
        tintColor: 'white',
        position: 'relative',
        top: 40,
        left: 40,
    },
});
export default AccountViewUser;
