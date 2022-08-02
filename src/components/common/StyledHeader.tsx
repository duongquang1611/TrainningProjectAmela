import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { goBack } from 'navigation/NavigationService';
import React from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/helper';

interface HeaderProps extends ViewProps {
    isBack?: boolean;
    title?: string;
    iconAction?: any;
    customStyle?: StyleProp<ViewStyle>;
    onPressAction?(): void;
    isShadow?: boolean;
    customHandleBackPress?(): void;
}

const StyledHeader = (props: HeaderProps) => {
    const {
        isBack = true,
        title,
        iconAction,
        customStyle,
        onPressAction,
        isShadow = true,
        customHandleBackPress,
        style,
    } = props;
    const onBack = () => {
        if (customHandleBackPress) {
            customHandleBackPress();
            return;
        }
        goBack();
    };

    if (style) {
        logger('You should use customStyle to implement this component to avoid conflict', true);
    }

    return (
        <View style={[styles.container, customStyle, isShadow && styles.shadow]}>
            <View style={styles.viewHeader}>
                {isBack ? (
                    <StyledTouchable onPress={onBack} customStyle={styles.buttonBack}>
                        <StyledIcon source={Images.icons.back} size={30} customStyle={styles.iconBack} />
                    </StyledTouchable>
                ) : (
                    <View style={styles.buttonBack} />
                )}
                <StyledText originValue={title || ' '} customStyle={styles.title} numberOfLines={1} />
                {iconAction ? (
                    <StyledTouchable onPress={onPressAction} customStyle={styles.buttonAction}>
                        <StyledIcon source={iconAction} size={30} />
                    </StyledTouchable>
                ) : (
                    <View style={styles.buttonAction} />
                )}
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        justifyContent: 'flex-end',
        paddingTop: Metrics.safeTopPadding,
    },
    viewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '14@vs',
        paddingHorizontal: '20@s',
    },
    buttonBack: {
        width: '25@vs',
        height: '25@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: '20@ms',
        fontWeight: 'bold',
        color: Themes.COLORS.black,
    },
    buttonAction: {
        width: '25@vs',
        height: '25@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: Themes.COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 5.49,
        elevation: 5,
    },
    iconBack: {
        tintColor: Themes.COLORS.black,
    },
});

export default React.memo(StyledHeader);
