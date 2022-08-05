import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React, { memo } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Images from '../../assets/images';
import { navigate } from '../../navigation/NavigationService';

const HeaderLogAndRegister = (props: any) => {
    const {
        title,
        customStyle,
        img,
        customStyleIcon,
        onPressIconRight,
        isBack = true,
        customStyleIconBack,
        router,
    } = props;

    return (
        <View style={styles.container}>
            {Boolean(title) && <StyledText i18nText={title} customStyle={customStyle} />}
            {Boolean(img) && (
                <StyledTouchable onPress={onPressIconRight}>
                    <StyledIcon source={img} size={26} customStyle={customStyleIcon} />
                </StyledTouchable>
            )}
            {isBack ? (
                <StyledTouchable onPress={() => navigate(router)} customStyle={styles.buttonBack}>
                    <StyledIcon
                        source={Images.icons.back}
                        size={50}
                        customStyle={[styles.cssIcon, customStyleIconBack]}
                    />
                </StyledTouchable>
            ) : (
                <View style={styles.buttonBack} />
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '375@s',
        height: '100@vs',
        backgroundColor: Themes.COLORS.ebonyClay,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonBack: {
        width: '25@vs',
        height: '25@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cssIcon: {
        marginTop: '30@vs',
    },
});

export default memo(HeaderLogAndRegister);
