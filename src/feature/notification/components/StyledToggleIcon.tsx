import { StyledImage } from 'components/base';
import React from 'react';
import { Animated } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Themes } from '../../../assets/themes';

const StyledToggleIcon = ({ size, customStyle, source }: any) => {
    return (
        <Animated.View
            style={[
                {
                    width: scale(size / 1.2),
                    height: scale(size / 1.2),
                    borderRadius: scale(size / 2),
                    backgroundColor: Themes.COLORS.black,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: scale(-size),
                    zIndex: scale(999),
                },
                customStyle,
            ]}>
            <StyledImage
                source={source}
                customStyle={{
                    width: scale(size / 2.5),
                    height: scale(size / 2.5),
                }}
            />
        </Animated.View>
    );
};

export default StyledToggleIcon;
