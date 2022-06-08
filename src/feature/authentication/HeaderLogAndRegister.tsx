import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React, { memo } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const HeaderLogAndRegister = (props: any) => {
    const { title, customStyle, img, customStyleIcon, onPressIconRight } = props;
    return (
        <View style={styles.container}>
            {Boolean(title) && <StyledText i18nText={title} customStyle={customStyle} />}
            {Boolean(img) && (
                <StyledTouchable onPress={onPressIconRight}>
                    <StyledIcon source={img} size={26} customStyle={customStyleIcon} />
                </StyledTouchable>
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
});

export default memo(HeaderLogAndRegister);
