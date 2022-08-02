import { Themes } from 'assets/themes';
import React, { useState, forwardRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ColorValue,
    ReturnKeyTypeOptions,
    StyleProp,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { AutoCompleteType, TextContentType } from 'utilities/CommonInterface';
import StyledText, { I18Type } from './StyledText';
import StyledTouchable from './StyledTouchable';

export interface StyledInputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    customStyle?: StyleProp<TextStyle>;
    wrapInputStyle?: StyleProp<ViewStyle>;
    customLabelStyle?: StyleProp<TextStyle>;
    customErrorStyle?: StyleProp<TextStyle>;
    customPlaceHolder?: any;
    placeholderTextColor?: ColorValue;
    customUnderlineColor?: ColorValue;
    customReturnKeyType?: ReturnKeyTypeOptions;
    ref?: any;
    errorMessage?: string;
    label?: string;
    textContentType?: TextContentType;
    autoCompleteType?: AutoCompleteType;
    renderRight?: any;
    onPress?: any;
}
const WrapInputComponent = ({ onPress, children, customStyle }: any) => {
    return onPress ? (
        <StyledTouchable customStyle={customStyle} onPress={onPress}>
            {children}
        </StyledTouchable>
    ) : (
        <View style={customStyle}>{children}</View>
    );
};
const StyledInput = (props: StyledInputProps, ref: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const input = useRef<TextInput>(null);
    const { t } = useTranslation();

    const {
        containerStyle,
        label,
        customStyle,
        customLabelStyle,
        customPlaceHolder,
        customReturnKeyType = 'next',
        renderRight,
        errorMessage,
        customErrorStyle,
        placeholderTextColor = Themes.COLORS.grey,
        customUnderlineColor = 'transparent',
        autoCompleteType = 'off',
        textContentType = 'none',
        wrapInputStyle,
        onPress,
        ...otherProps
    } = props;
    return (
        <View style={[styles.container, containerStyle]}>
            {!!label && <StyledText customStyle={[styles.label, customLabelStyle]} i18nText={label as I18Type} />}
            <WrapInputComponent
                customStyle={[
                    wrapInputStyle,
                    !isFocused && !!errorMessage && { borderColor: Themes.COLORS.borderInputError },
                ]}
                onPress={onPress}>
                <TextInput
                    ref={ref || input}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={[
                        styles.textInput,
                        customStyle,
                        !isFocused && !!errorMessage && { borderColor: Themes.COLORS.borderInputError },
                    ]}
                    placeholderTextColor={placeholderTextColor}
                    placeholder={customPlaceHolder ? t(customPlaceHolder) : ''}
                    underlineColorAndroid={customUnderlineColor}
                    autoCompleteType={autoCompleteType}
                    textContentType={textContentType}
                    importantForAutofill="yes"
                    autoCorrect={false}
                    returnKeyType={customReturnKeyType}
                    blurOnSubmit={!!customReturnKeyType}
                    {...otherProps}
                />
                {!!renderRight && <View style={styles.rightView}>{renderRight?.()}</View>}
            </WrapInputComponent>
            {!!errorMessage && (
                <StyledText i18nText={errorMessage as I18Type} customStyle={[styles.errorMessage, customErrorStyle]} />
            )}
        </View>
    );
};
const styles = ScaledSheet.create({
    textInput: {
        width: '327@s',
        height: '52@vs',
        padding: '10@s',
        borderRadius: '5@s',
        backgroundColor: Themes.COLORS.white,
    },
    errorMessage: {
        fontSize: '12@ms',
        color: Themes.COLORS.borderInputError,
        marginLeft: '5@s',
    },
    container: {
        marginVertical: 8,
        marginTop: '15@s',
    },
    label: {},
    rightView: {
        position: 'absolute',
        right: '10@s',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default forwardRef(StyledInput);
