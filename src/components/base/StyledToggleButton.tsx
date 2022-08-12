import React, { useRef, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import Images from '../../assets/images';
import { Themes } from '../../assets/themes';
import StyledToggleIcon from '../../feature/notification/components/StyledToggleIcon';
import StyledImage from './StyledImage';

interface StyledToggleButtonProps {
    size?: number;
    onPress?(): void;
    actions: any[];
}
const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);
const StyledToggleButton = (props: StyledToggleButtonProps) => {
    const { actions = [], size = 50 } = props;
    const [isActive, setIsActive] = useState(false);
    const offset = useRef(new Animated.Value(0)).current;
    const animationIconPlus = {
        transform: [
            {
                rotate: offset.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-45deg'],
                }),
            },
        ],
    };

    const animationIconShow = {
        transform: [
            {
                scale: offset,
            },
            {
                translateY: offset.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, scale(-size / 2)],
                }),
            },
        ],
    };

    const toggleMenu = () => {
        setIsActive(!isActive);
        Animated.spring(offset, {
            toValue: isActive ? 0 : 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View>
            <AnimatedTouchable style={styles.cssToggleMenu} onPress={toggleMenu}>
                <Animated.View
                    style={[
                        {
                            width: scale(size / 1.2),
                            height: scale(size / 1.2),
                            borderRadius: scale(size / 2),
                            backgroundColor: Themes.COLORS.black,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 999,
                        },
                        animationIconPlus,
                    ]}>
                    <StyledImage
                        source={Images.icons.bell}
                        customStyle={{
                            width: scale(size / 2.5),
                            height: scale(size / 2.5),
                        }}
                    />
                </Animated.View>
            </AnimatedTouchable>
            {actions.map((iconName: any, index: number) => {
                return (
                    <StyledToggleIcon key={index} size={size} customStyle={animationIconShow} source={iconName.icon} />
                );
            })}
        </View>
    );
};

const styles = ScaledSheet.create({
    cssToggleMenu: {
        position: 'absolute',
        zIndex: 999,
    },
});
export default StyledToggleButton;
