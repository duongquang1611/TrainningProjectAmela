import { StyledButton, StyledImage } from 'components/base';
import React, { FunctionComponent, useRef, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import Images from '../../assets/images';
import Metrics from '../../assets/metrics';
import { Themes } from '../../assets/themes';
import StyledSwitch from '../../components/base/StyledSwitch';
import StyledIconHeader from './components/StyledIconHeader';

const AnimatedStyledInput = Animated.createAnimatedComponent(TextInput);
const UPPER_HEADER_HEIGHT = scale(40);
const LOWER_HEADER_HEIGHT = scale(96);
const NotificationScreen: FunctionComponent = () => {
    const [isActive, setIsActive] = useState(false);
    const offset = useRef(new Animated.Value(0)).current;

    const textInputAnimation = {
        transform: [
            {
                scaleX: offset.interpolate({
                    inputRange: [0, LOWER_HEADER_HEIGHT],
                    outputRange: [scale(1), 0],
                    extrapolate: 'clamp',
                }),
            },
            {
                translateX: offset.interpolate({
                    inputRange: [0, LOWER_HEADER_HEIGHT],
                    outputRange: [0, scale(-100)],
                    extrapolate: 'clamp',
                }),
            },
        ],
        opacity: offset.interpolate({
            inputRange: [0, LOWER_HEADER_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        }),
    };
    const featureNameAnimation = {
        transform: [
            {
                scale: offset.interpolate({
                    inputRange: [0, LOWER_HEADER_HEIGHT],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                }),
            },
        ],
        opacity: offset.interpolate({
            inputRange: [0, LOWER_HEADER_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        }),
    };
    const viewChangeAnimationPlus = {
        transform: [
            {
                translateX: offset.interpolate({
                    inputRange: [0, LOWER_HEADER_HEIGHT],
                    outputRange: [scale(10), scale(40)],
                    extrapolate: 'clamp',
                }),
            },
            {
                translateY: offset.interpolate({
                    inputRange: [0, LOWER_HEADER_HEIGHT],
                    outputRange: [0, scale(-60)],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };
    const viewChangeAnimationWithDrawMoney = {
        transform: [
            {
                translateX: offset.interpolate({
                    inputRange: [0, LOWER_HEADER_HEIGHT],
                    outputRange: [0, scale(-10)],
                    extrapolate: 'clamp',
                }),
            },
            {
                translateY: offset.interpolate({
                    inputRange: [10, LOWER_HEADER_HEIGHT],
                    outputRange: [0, scale(-60)],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };
    const viewChangeAnimationQR = {
        transform: [
            {
                translateX: offset.interpolate({
                    inputRange: [0, LOWER_HEADER_HEIGHT],
                    outputRange: [0, scale(-50)],
                    extrapolate: 'clamp',
                }),
            },
            {
                translateY: offset.interpolate({
                    inputRange: [10, LOWER_HEADER_HEIGHT],
                    outputRange: [0, scale(-60)],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };
    const viewChangeAnimationScanQR = {
        transform: [
            {
                translateX: offset.interpolate({
                    inputRange: [0, LOWER_HEADER_HEIGHT],
                    outputRange: [0, scale(-90)],
                    extrapolate: 'clamp',
                }),
            },
            {
                translateY: offset.interpolate({
                    inputRange: [0, LOWER_HEADER_HEIGHT],
                    outputRange: [0, scale(-60)],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };
    const changeBackgroundColor = offset.interpolate({
        inputRange: [0, LOWER_HEADER_HEIGHT],
        outputRange: [Themes.COLORS.black, Themes.COLORS.transparent],
    });
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.upperHeaderPlaceHoler} />
            </SafeAreaView>
            <SafeAreaView style={styles.header}>
                <View style={styles.upperHeader}>
                    <View style={styles.searchContainer}>
                        <StyledImage source={Images.icons.searchMoMo} customStyle={styles.cssIconSearch} />
                        <AnimatedStyledInput
                            placeholder="Tìm kiếm"
                            placeholderTextColor="rgba(255, 255, 255, 0.8)"
                            style={[styles.cssInputSearch, textInputAnimation]}
                        />
                    </View>
                    <StyledImage source={Images.icons.bell} customStyle={styles.cssIconBell} />
                    <StyledImage source={Images.icons.avatar} customStyle={styles.cssIconAvatar} />
                </View>
                <View style={styles.lowHeader}>
                    <StyledIconHeader
                        changeBackgroundColor={changeBackgroundColor}
                        viewChangeAnimationPlus={viewChangeAnimationPlus}
                        featureNameAnimation={featureNameAnimation}
                        source={Images.icons.plus}
                        content="Nạp tiền"
                    />
                    <StyledIconHeader
                        changeBackgroundColor={changeBackgroundColor}
                        viewChangeAnimationPlus={viewChangeAnimationWithDrawMoney}
                        featureNameAnimation={featureNameAnimation}
                        source={Images.icons.deposit}
                        content="Rút tiền"
                    />
                    <StyledIconHeader
                        changeBackgroundColor={changeBackgroundColor}
                        viewChangeAnimationPlus={viewChangeAnimationQR}
                        featureNameAnimation={featureNameAnimation}
                        source={Images.icons.scan}
                        content="Mã QR"
                    />
                    <StyledIconHeader
                        changeBackgroundColor={changeBackgroundColor}
                        viewChangeAnimationPlus={viewChangeAnimationScanQR}
                        featureNameAnimation={featureNameAnimation}
                        source={Images.icons.qr}
                        content="Quét Mã"
                    />
                </View>
            </SafeAreaView>
            <ScrollView
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
                    useNativeDriver: false,
                })}
                showsVerticalScrollIndicator={false}
                snapToInterval={scale(LOWER_HEADER_HEIGHT)}
                scrollEventThrottle={16}>
                <View style={styles.paddingForHeader} />
                <View style={styles.scrollViewContainer}>
                    <View style={styles.body}>
                        <StyledButton title={'Logout'} onPress={AuthenticateService.logOut} />
                        <StyledSwitch
                            size={50}
                            isActive={isActive}
                            onPress={() => {
                                setIsActive(!isActive);
                            }}
                            customStyle={styles.cssSwitch}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    cssSwitch: {
        margin: '10@s',
    },
    body: {
        marginTop: '80%',
    },
    header: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#AF0C6E',
    },
    scrollViewContainer: {
        height: Metrics.screenHeight,
        backgroundColor: Themes.COLORS.white,
    },
    paddingForHeader: {
        height: LOWER_HEADER_HEIGHT,
    },
    upperHeaderPlaceHoler: {
        height: '50@s',
    },
    upperHeader: {
        height: UPPER_HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '16@ms',
        marginTop: '10@s',
    },
    lowHeader: {
        height: LOWER_HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '16@s',
    },
    feature: {
        alignItems: 'center',
    },
    cssInputSearch: {
        position: 'absolute',
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: 'white',
        borderRadius: '4@s',
        paddingVertical: '4@s',
        paddingLeft: '32@s',
        marginLeft: '10@s',
    },
    cssIconSearch: {
        width: '20@s',
        height: '20@s',
    },
    cssIconBell: {
        width: '18@s',
        height: '18@s',
        marginHorizontal: '32@ms',
    },
    cssIconAvatar: {
        width: '28@s',
        height: '28@s',
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureIcon: {
        width: '32@s',
        height: '32@s',
    },
    featureName: {
        fontWeight: 'bold',
        fontSize: '12@ms',
        lineHeight: '14@ms',
        color: Themes.COLORS.white,
        marginTop: '12@vs',
    },
    featureChangeIcon: {
        width: '16@s',
        height: '16@s',
        position: 'absolute',
        top: '8@vs',
    },
    cssBoxIcon: {
        width: '40@s',
        height: '40@s',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8@s',
    },
});
export default NotificationScreen;
