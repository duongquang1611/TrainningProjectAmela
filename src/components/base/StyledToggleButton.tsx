import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Pressable } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Images from '../../assets/images';
import StyledImage from './StyledImage';

// interface StyledToggleButtonProps {
//     title: string;
//     customStyle?: StyleProp<ViewStyle>;
//     customStyleText?: StyleProp<TextStyle>;
//     onPress(params?: any): void;
//     onLongPress?(): void;
//     disabled?: boolean;
// }

const StyledToggleButton = () => {
    // const { title, customStyle, onPress, customStyleText, onLongPress, disabled = false } = props;
    const [isActive, setIsActive] = useState(false);
    const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);
    const offset = useRef(new Animated.Value(0)).current;
    const animationIconPlus = {
        transform: [
            { scale: offset },
            {
                opacity: offset.interpolate({
                    inputRange: [1, 100],
                    outputRange: [0, 1],
                }),
            },
        ],
    };
    useEffect(() => {
        Animated.timing(offset, {
            toValue: isActive ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isActive]);
    return (
        <View style={styles.container}>
            <AnimatedTouchable
                onPress={() => {
                    setIsActive(!isActive);
                }}>
                <Animated.View style={styles.boxContainerIconHide}>
                    <StyledImage source={Images.icons.plus} customStyle={[styles.featureIcon, animationIconPlus]} />
                </Animated.View>
            </AnimatedTouchable>
            <View style={styles.boxContainerIconHide}>
                <StyledImage source={Images.icons.plus} customStyle={styles.featureIcon} />
            </View>
            <View style={styles.boxContainerIconHide}>
                <StyledImage source={Images.icons.plus} customStyle={styles.featureIcon} />
            </View>
            <View style={styles.boxContainerIconHide}>
                <StyledImage source={Images.icons.plus} customStyle={styles.featureIcon} />
            </View>
            <View style={styles.boxContainerIcon}>
                <StyledImage source={Images.icons.plus} customStyle={styles.featureIcon} />
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    boxContainerIcon: {
        width: 50,
        height: 50,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    featureIcon: {
        position: 'absolute',
        width: 30,
        height: 30,
    },
    boxContainerIconHide: {
        width: 50,
        height: 50,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        position: 'absolute',
    },
});

export default StyledToggleButton;
