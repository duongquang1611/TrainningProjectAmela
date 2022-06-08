import React, { useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
// import { ScrollView, View } from 'react-native';
import { StyledButton, StyledImage, StyledText, StyledTouchable } from 'components/base';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { useNavigation } from '@react-navigation/native';
import { Themes } from 'assets/themes';
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsAndroid, Platform, ScrollView, View } from 'react-native';

const AccountHome = () => {
    const navigation = useNavigation();
    const [imageUp, setImage] = useState();
    const [imagesUp, setImages] = useState();

    const upImgFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImage(image.path);
        });
    };
    const selectCamera = async () => {
        if (Platform.OS === 'android' && 'ios') {
            const permissionAndroid = await PermissionsAndroid.check('android.permission.CAMERA');
            if (permissionAndroid !== PermissionsAndroid.RESULTS.granted) {
                const reqPer = await PermissionsAndroid.request('android.permission.CAMERA');

                if (reqPer === 'granted') {
                    ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        cropping: true,
                    }).then(image => {
                        setImage(image.path);
                    });
                }
            }
        }
    };
    // checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.FACE_ID]).then(statuses => {
    //     console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
    //     console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
    // });
    const upManyImg = () => {
        ImagePicker.openPicker({
            multiple: true,
        }).then(images => {
            setImages(images);
        });
    };

    return (
        <View style={styles.container}>
            <StyledButton
                title="Update-User"
                customStyle={styles.cssBtn}
                onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.USER_PROFILE)}
            />
            <View style={styles.cssSelect}>
                <StyledTouchable onPress={upImgFromGallery}>
                    <View style={styles.upload}>
                        <StyledText originValue="Chọn thư viện" />
                    </View>
                </StyledTouchable>
                <StyledTouchable onPress={selectCamera}>
                    <View style={styles.upload}>
                        <StyledText originValue="Mở cammera" />
                    </View>
                </StyledTouchable>
                <StyledTouchable onPress={upManyImg}>
                    <View style={styles.upload}>
                        <StyledText originValue="Chọn nhiều ảnh" />
                    </View>
                </StyledTouchable>
            </View>
            {/* <ScrollView> */}
            <View style={styles.img}>
                <ScrollView>
                    <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center' }}>
                        {imagesUp &&
                            imagesUp?.length > 0 &&
                            imagesUp.map((item: any, index: number) => (
                                <View style={{ width: 500, height: 300 }} key={index}>
                                    <StyledImage
                                        source={{ uri: item.path }}
                                        customStyle={{ width: '100%', height: '80%', resizeMode: 'contain' }}
                                    />
                                    {console.log('path', item)}
                                </View>
                            ))}
                        {imageUp && (
                            <View style={{ width: 300, height: 300 }}>
                                <StyledImage
                                    source={{ uri: imageUp }}
                                    customStyle={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'contain',
                                        marginTop: 10,
                                    }}
                                />
                            </View>
                        )}
                    </View>
                    {/* {imageUp?.length >= 2 ? (
                    imageUp?.length > 0 &&
                    imageUp.map((item: any, index: number) => (
                        <View style={{ width: 300, height: 300, backgroundColor: 'pink' }} key={index}>
                            <StyledImage
                                source={{ uri: item.path }}
                                customStyle={{ width: 30, height: 30, resizeMode: 'contain' }}
                            />
                            {console.log('path', item)}
                        </View>
                    ))
                ) : (
                    <StyledImage
                        source={{ uri: imageUp }}
                        customStyle={{ width: '100%', height: '100%', resizeMode: 'contain', marginTop: 10 }}
                    />
                )} */}
                    {/* switch (imageUp?.length >=2) {
                   case value:
                        imageUp.map((item: any, index: number) => (
                            <View style={{ width: 300, height: 300, backgroundColor: 'pink' }} key={index}>
                                <StyledImage
                                    source={{ uri: item.path }}
                                    customStyle={{ width: 30, height: 30, resizeMode: 'contain' }}
                                />
                                {console.log('path', item)}
                            </View>
                        ))
                        break;
                
                    default:
                        <StyledImage
                        source={{ uri: imageUp }}
                        customStyle={{ width: '100%', height: '100%', resizeMode: 'contain', marginTop: 10 }}
                    />
                        break;
                } */}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    cssBtn: {
        width: '100@s',
        height: '50@vs',
        borderRadius: '20@s',
        marginVertical: '40@s',
    },
    upload: {
        width: '100@ms',
        height: '50@vs',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.COLORS.LightGray,
        marginTop: '10@vs',
    },
    imgPicker: {
        width: '30@s',
        height: '35@vs',
        backgroundColor: 'red',
        justifyContent: 'center',
        borderRadius: '5@s',
    },
    img: {
        flex: 7,
        backgroundColor: 'blue',
    },
    cssImg: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    cssSelect: {
        flex: 1,
        backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default AccountHome;
