import React, { memo, useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Images from '../../../assets/images';

const AnimatedHearts = () => {
    const animatedValueY = useRef(new Animated.Value(0)).current;
    const { height } = Dimensions.get('window');
    useEffect(() => {
        Animated.timing(animatedValueY, {
            toValue: -height,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }, [animatedValueY]);
    return (
        <Animated.Image
            source={Images.icons.heart}
            style={[
                styles.cssHeart,
                {
                    transform: [
                        {
                            translateY: animatedValueY.interpolate({
                                inputRange: [-height, 0],
                                outputRange: [-height, 0],
                            }),
                        },
                    ],
                },
            ]}
        />
    );
};
const styles = ScaledSheet.create({
    cssHeart: {
        width: '24@s',
        height: '24@s',
        position: 'absolute',
        right: '-10@s',
    },
});
export default memo(AnimatedHearts);
