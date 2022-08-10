import React, { useEffect, useRef } from 'react';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { Animated, Pressable, View } from 'react-native';

type SwitchProps = {
    size?: number;
    onPress?: () => void;
    isActive: boolean;
    thumbColor?: string[];
    trackColor?: string[];
    customStyle?: any;
};
const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);
const StyledSwitch: React.FC<SwitchProps> = ({
    size = 50,
    onPress,
    isActive = false,
    thumbColor = ['red', 'green'],
    trackColor = ['pink', 'black'],
    customStyle,
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    const changedIconBG = animatedValue.interpolate({
        inputRange: [0, scale(size / 2)],
        outputRange: trackColor,
    });

    const changedBG = animatedValue.interpolate({
        inputRange: [0, scale(size / 2)],
        outputRange: thumbColor,
    });

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isActive ? scale(size * 0.9 - size / 2) : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isActive]);
    return (
        <AnimatedTouchable
            onPress={onPress}
            style={[
                {
                    width: scale(size),
                    height: scale(size / 1.8),
                    backgroundColor: changedBG,
                    borderRadius: scale(size / 2),
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                customStyle,
            ]}>
            <View style={styles.cssRound}>
                <Animated.View
                    style={{
                        width: scale(size / 2),
                        height: scale(size / 2),
                        backgroundColor: changedIconBG,
                        marginLeft: animatedValue,
                        borderRadius: scale(size / 2),
                    }}
                />
            </View>
        </AnimatedTouchable>
    );
};
const styles = ScaledSheet.create({
    cssRound: {
        width: '90%',
        height: '90%',
        justifyContent: 'center',
    },
});
export default StyledSwitch;
