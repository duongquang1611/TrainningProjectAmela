import React, { FunctionComponent } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledText, StyledTouchable } from '.';

interface StyledButtonProps {
    title: string;
    customStyle?: StyleProp<ViewStyle>;
    customStyleText?: StyleProp<TextStyle>;
    onPress(params?: any): void;
    onLongPress?(): void;
    disabled?: boolean;
}

const StyledButton: FunctionComponent<StyledButtonProps> = (props: StyledButtonProps) => {
    const { title, customStyle, onPress, customStyleText, onLongPress, disabled = false } = props;
    return (
        <StyledTouchable
            customStyle={[styles.container, customStyle]}
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}>
            <StyledText i18nText={title} customStyle={customStyleText} />
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '327@s',
        height: '52@vs',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});

export default StyledButton;
