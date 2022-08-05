import React, { useMemo, useState } from 'react';
import { Themes } from 'assets/themes';
import { ScaledSheet } from 'react-native-size-matters';
import { View } from 'react-native';
import { StyledButton, StyledImage, StyledInput, StyledText } from 'components/base';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app-redux/hooks';
import { putProfile } from 'api/modules/api-app/general';
import { useNavigation } from '@react-navigation/native';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { getProfileUser } from 'api/modules/api-app/authenticate';
import { navigate } from '../../navigation/NavigationService';

const AccountViewUser = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.userInfo);

    const imgProfile = user?.images[0].name;
    // const lastIndex = imgProfile.lastIndexOf('/');
    // const checkImgProfile = imgProfile.slice(lastIndex + 1);
    const checkImgProfile = imgProfile.split('/', 4);
    console.log(checkImgProfile);

    // const getIndex = imgProfile.indexOf('.com/' || '.vn');
    // const resultImg = imgProfile.slice(0, getIndex + 5 || getIndex + 3);
    // const checkImgProfile = imgProfile.replace(resultImg, 'https://aos-app-order-soba-8e35e74.s3.amazonaws.com/');

    const [nameUser, setNameUser] = useState('');
    const [youPhone, setYouPhone] = useState('');
    const [youEmail, setYouEmail] = useState('');

    const putUpdateUserProfile = async () => {
        try {
            await putProfile({
                fullName: nameUser,
                phone: youPhone,
                email: youEmail,
            });
            getProfile();
        } catch (error) {
            console.log(error);
        }
    };
    const getProfile = async () => {
        try {
            const res = await getProfileUser();

            dispatch(userInfoActions.getUserInfoSuccess(res.data));
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = () => {
        putUpdateUserProfile();
    };
    const characters =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkEmail = characters.test(youEmail);
    console.log(checkEmail);
    // const conditionUpdate =
    //     nameUser.length < 10 &&
    //     nameUser.length > 5 &&
    //     youEmail.length > 5 &&
    //     youEmail.length < 30 &&
    //     youPhone.length >= 10 &&
    //     youPhone.length <= 11 &&
    //     parseInt(youPhone, 10) &&
    //     checkEmail;
    const errorForm = useMemo(() => {
        const finalError: any = {
            youPhone: [],
            youEmail: [],
            nameUser: [],
        };
        if (youPhone && youPhone?.length < 10) {
            finalError.youPhone[0] = 'khong du ky tu';
        }
        if (youPhone?.length > 12) {
            finalError.youPhone[0] = 'Nhap qua ky tu';
        }
        if (nameUser && nameUser.length < 5) {
            finalError.nameUser[0] = 'Nhap qua ky tu';
        }
        if (nameUser?.length > 12) {
            finalError.nameUser[0] = 'Nhap qua ky tu';
        }
        // if (youEmail && youEmail?.length < 20) {
        //     finalError.youEmail[0] = 'Nhap qua ky tu';
        // }
        if (youEmail && !checkEmail) {
            finalError.youEmail[0] = 'Chưa nhập đúng email';
        }
        if (youEmail?.length > 50) {
            finalError.youEmail[0] = 'Nhap qua ky tu';
        }

        return finalError;
    }, [nameUser, youPhone, youEmail]);
    const disabled = Object.values(errorForm).find((item: any) => item.length > 0);

    return (
        <View style={styles.container}>
            <View style={styles.cssHeader}>
                <StyledButton
                    title="⬅⬅⬅"
                    customStyle={styles.cssBtnGoback}
                    onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.USER_HOME)}
                />
                <StyledText originValue="Get Profile" customStyle={styles.cssTitleHeader} />
            </View>
            <View style={styles.cssAvatar}>
                <StyledImage
                    source={{
                        uri: `https://aos-app-order-soba-8e35e74.s3.amazonaws.com/${
                            checkImgProfile[checkImgProfile.length - 1]
                        }`,
                    }}
                    customStyle={styles.cssImg}
                />
            </View>
            <View style={styles.boxGetProfile}>
                <View style={styles.cssBoxUserName}>
                    <StyledText originValue={`UserName : ${user?.name}`} customStyle={styles.txtProfile} />
                </View>
                <View style={styles.cssBoxUserName}>
                    <StyledText originValue={`Birthday : ${user?.birthday}`} customStyle={styles.txtProfile} />
                </View>
                <View style={styles.cssBoxUserName}>
                    <StyledText originValue={`Email : ${user?.email}`} customStyle={styles.txtProfile} />
                </View>
            </View>
            <StyledText originValue="Update Profile" customStyle={styles.cssTitle} />
            <View style={styles.cssBoxUpdateProfile}>
                <StyledInput
                    customPlaceHolder="Fill user name ...."
                    customStyle={styles.cssInput}
                    onChangeText={setNameUser}
                />
                {/* {(nameUser?.length <= 5 || nameUser?.length >= 10) && !!nameUser?.length && (
                    <StyledText i18nText={'Username ko du ky tu!'} customStyle={{ color: 'black' }} />
                )} */}
                {!!errorForm.nameUser?.length && (
                    <StyledText i18nText={errorForm.nameUser[0]} customStyle={{ color: 'black' }} />
                )}
                <StyledInput
                    customPlaceHolder="Fill  phone number ...."
                    customStyle={styles.cssInput}
                    onChangeText={setYouPhone}
                />
                {!!errorForm.youPhone?.length && (
                    <StyledText i18nText={errorForm.youPhone[0]} customStyle={{ color: 'black' }} />
                )}
                {/* {youPhone?.length < 12 && !!youPhone?.length && (
                    <StyledText i18nText={errorCheck.phone[0].message} customStyle={{ color: 'black' }} />
                )} */}
                {/* {youPhone?.length >= 10 && !!youPhone?.length && (
                    <StyledText i18nText={errorCheck.phone[3].message} customStyle={{ color: 'black' }} />
                )}
                {youPhone?.length === 10 && !!youPhone?.length && (
                    <StyledText i18nText={errorCheck.phone[2].message} customStyle={{ color: 'black' }} />
                )} */}
                <StyledInput
                    customPlaceHolder="Fill your email ...."
                    customStyle={styles.cssInput}
                    onChangeText={setYouEmail}
                />
                {!!errorForm.youEmail?.length && (
                    <StyledText i18nText={errorForm.youEmail[0]} customStyle={{ color: 'black' }} />
                )}
                {/* {youEmail?.length <= 10 && !!youEmail?.length && checkEmail && (
                    <StyledText i18nText={errorCheck.email[0].message} customStyle={{ color: 'black' }} />
                )}
                {youEmail?.length >= 30 && !!youEmail?.length && checkEmail && (
                    <StyledText i18nText={errorCheck.email[3].message} customStyle={{ color: 'black' }} />
                )}
                {youEmail?.length === 0 && checkEmail && (
                    <StyledText i18nText={errorCheck.email[2].message} customStyle={{ color: 'black' }} />
                )} */}
                <StyledButton
                    title="Update"
                    customStyle={[
                        disabled
                            ? {
                                  backgroundColor: Themes.COLORS.green,
                              }
                            : {},
                        styles.cssBtn,
                    ]}
                    onPress={handleSubmit}
                    disabled={!!disabled}
                    // disabled={!conditionUpdate}
                />
                <StyledButton
                    title="Search Member"
                    customStyle={styles.cssBtn}
                    onPress={() => navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.SEARCH_USER)}
                />
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
    },
    button: {
        width: '150@s',
        marginTop: 5,
        backgroundColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    cssTitle: {
        fontSize: '20@s',
        textAlign: 'center',
        fontWeight: 'bold',
        color: Themes.COLORS.darkOrange,
    },
    boxProfile: {
        width: '80%',
        height: '300@vs',
        borderWidth: '2@s',
        marginTop: '10@vs',
    },
    cssBoxUserName: {
        width: '100%',
        borderWidth: '2@s',
        padding: '10@s',
        flexDirection: 'row',
    },
    txtProfile: {
        fontSize: '18@s',
    },
    boxGetProfile: {
        width: '100%',
        height: '180@vs',
        marginTop: '12@vs',
        justifyContent: 'center',
    },
    cssBoxUpdateProfile: {
        width: '100%',
        height: '100%',
    },
    cssBtn: {
        width: '100@ms',
        height: '50@vs',
        borderRadius: 20,
        marginVertical: '5@vs',
    },
    cssInput: {
        width: '100%',
        borderWidth: '2@s',
    },
    cssHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cssBtnGoback: {
        width: '80@s',
        height: '30@s',
        marginTop: '45@s',
        marginLeft: '5@s',
        backgroundColor: Themes.COLORS.white,
    },
    cssTitleHeader: {
        fontSize: '20@s',
        marginTop: '50@vs',
        marginLeft: '55@s',
        fontWeight: 'bold',
        color: Themes.COLORS.darkOrange,
    },
    cssAvatar: {
        width: '100@s',
        height: '100@s',
        backgroundColor: 'blue',
        borderRadius: '50@s',
    },
    cssImg: {
        width: '100%',
        borderRadius: '50@s',
        height: '100%',
    },
});

export default AccountViewUser;
