import { StyledButton, StyledImage, StyledText } from 'components/base';
import React, { FunctionComponent, useRef, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import Images from '../../assets/images';
import Metrics from '../../assets/metrics';
import { Themes } from '../../assets/themes';
import StyledSwitch from '../../components/base/StyledSwitch';
import StyledToggleButton from '../../components/base/StyledToggleButton';
import AnimatedHearts from './components/AnimatedHearts';
import StyledIconHeader from './components/StyledIconHeader';

const actions = [
    {
        text: 'Accessibility',
        icon: Images.icons.bell,
        name: 'bt_accessibility',
        position: 2,
    },
    {
        text: 'Language',
        icon: Images.icons.avatar,
        name: 'bt_language',
        position: 1,
    },
    {
        text: 'Location',
        icon: Images.icons.scanCircle,
        name: 'bt_room',
        position: 3,
    },
];
const AnimatedStyledInput = Animated.createAnimatedComponent(TextInput);
const UPPER_HEADER_HEIGHT = scale(40);
const LOWER_HEADER_HEIGHT = scale(96);
const getRenderId = () => {
    return Math.floor(Math.random() * Date.now()).toString();
};
const NotificationScreen: FunctionComponent = () => {
    const [isActive, setIsActive] = useState(false);
    const [heartCount, setHeartCount] = useState(0);
    const [hearts, setHearts] = useState<{ id: string }[]>([]);
    const heartCountAnimatedValue = useRef(new Animated.Value(0)).current;
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
                        <View style={styles.styleMessageContainer}>
                            <View style={styles.styleAvatarMessage}>
                                <StyledImage source={Images.icons.avatar} customStyle={styles.styleImgAvatarMessage} />
                            </View>
                            <View style={styles.textMessage}>
                                <View style={styles.boxMessage}>
                                    <StyledText
                                        originValue="Xin Chào ! Tôi là Hoàng Ngọc Long"
                                        customStyle={styles.txtMessageTitle}
                                    />
                                    <StyledText
                                        originValue="Position : developer React Native"
                                        customStyle={styles.txtContentMessage}
                                    />
                                    <StyledText originValue="Division : Hades" customStyle={styles.txtContentMessage} />
                                    <TouchableOpacity
                                        style={styles.styleHeart}
                                        onPress={() => {
                                            setHeartCount(heartCount + 1);
                                            setHearts([...hearts, { id: getRenderId() }]);
                                            setTimeout(() => {
                                                Animated.spring(heartCountAnimatedValue, {
                                                    toValue: 0,
                                                    speed: 48,
                                                    useNativeDriver: true,
                                                }).start();
                                            }, 500);
                                            Animated.spring(heartCountAnimatedValue, {
                                                toValue: -50,
                                                speed: 48,
                                                useNativeDriver: true,
                                            }).start();
                                        }}>
                                        {heartCount ? (
                                            <StyledImage
                                                source={Images.icons.heart}
                                                customStyle={styles.cssHeart}
                                                resizeMode="contain"
                                            />
                                        ) : (
                                            <StyledImage
                                                source={Images.icons.tab.follow}
                                                customStyle={styles.cssHeart}
                                                resizeMode="contain"
                                            />
                                        )}
                                    </TouchableOpacity>
                                    <Animated.View
                                        pointerEvents={'none'}
                                        style={[
                                            styles.styleHeart,
                                            {
                                                transform: [
                                                    {
                                                        translateY: heartCountAnimatedValue,
                                                    },
                                                    {
                                                        scaleX: heartCountAnimatedValue.interpolate({
                                                            inputRange: [scale(-50), 0],
                                                            outputRange: [scale(1), 0],
                                                            extrapolate: 'clamp',
                                                        }),
                                                    },
                                                ],
                                            },
                                        ]}>
                                        <StyledText originValue={`${heartCount}`} customStyle={{ color: 'red' }} />
                                    </Animated.View>
                                    {hearts.map(({ id }: any) => {
                                        return <AnimatedHearts key={id} />;
                                    })}
                                </View>
                            </View>
                        </View>
                        <StyledButton title={'Logout'} onPress={AuthenticateService.logOut} />
                        <StyledSwitch
                            size={50}
                            isActive={isActive}
                            onPress={() => {
                                setIsActive(!isActive);
                            }}
                            customStyle={styles.cssSwitch}
                        />
                        <View style={styles.cssToggleMenu}>
                            <StyledToggleButton size={50} actions={actions} />
                        </View>
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
    cssToggleMenu: {
        alignSelf: 'center',
        width: '50@s',
        height: '50@s',
        backgroundColor: Themes.COLORS.darkOrange,
    },
    styleMessageContainer: {
        width: '100%',
        height: '80@s',
        backgroundColor: Themes.COLORS.LightGray,
        marginVertical: '10@vs',
        flexDirection: 'row',
    },
    styleAvatarMessage: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleImgAvatarMessage: {
        width: '70@s',
        height: '70@s',
    },
    textMessage: {
        width: '90%',
        height: '100%',
        paddingHorizontal: '10@s',
        justifyContent: 'center',
    },
    boxMessage: {
        height: 'auto',
        width: '80%',
        backgroundColor: '#0099FF',
        borderRadius: '5@s',
        paddingVertical: '5@vs',
        paddingLeft: '5@ms',
    },
    txtMessageTitle: {
        fontSize: '15@s',
        color: Themes.COLORS.white,
        fontWeight: 'bold',
    },
    txtContentMessage: {
        color: Themes.COLORS.white,
    },
    styleHeart: {
        width: '30@s',
        height: '30@s',
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        position: 'absolute',
        right: '-10@s',
        bottom: '-5@s',
        zIndex: 999,
    },
    cssHeart: {
        width: '15@s',
        height: '15@s',
    },
});
export default NotificationScreen;
