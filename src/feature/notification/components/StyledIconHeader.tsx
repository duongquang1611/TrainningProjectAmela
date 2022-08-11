import { StyledImage } from 'components/base';
import React, { memo } from 'react';
import { Animated } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Themes } from '../../../assets/themes';

const StyledIconHeader = ({
    changeBackgroundColor,
    viewChangeAnimationPlus,
    featureNameAnimation,
    source,
    content,
}: any) => {
    return (
        <Animated.View style={[styles.feature, viewChangeAnimationPlus]}>
            <Animated.View style={[styles.cssBoxIcon, { backgroundColor: changeBackgroundColor }]}>
                <StyledImage source={source} customStyle={styles.featureIcon} />
            </Animated.View>
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>{content}</Animated.Text>
        </Animated.View>
    );
};
const styles = ScaledSheet.create({
    feature: {
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
export default memo(StyledIconHeader);
