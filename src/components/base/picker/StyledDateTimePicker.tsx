import Images from 'assets/images';
import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePickerModal, { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker';
import { formatDate } from 'utilities/format';
import StyledIcon from '../StyledIcon';
import StyledInput, { StyledInputProps } from '../StyledInput';

type StyledDateTimePickerProps = {
    value?: string;
    onChangeText?: (text: string) => void;
    dateTimeProps?: ReactNativeModalDateTimePickerProps;
    mode?: ReactNativeModalDateTimePickerProps['mode'];
    formatTemplate?: string;
    formatShow?: string;
} & StyledInputProps;

const StyledDateTimePicker = ({
    mode = 'date',
    value,
    onChangeText,
    dateTimeProps,
    formatTemplate,
    formatShow,
    ...inputProps
}: StyledDateTimePickerProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleConfirmDate = (date: any) => {
        hideDatePicker();
        onChangeText?.(formatDate(date, formatTemplate));
    };

    const hideDatePicker = () => {
        setIsVisible(false);
    };

    const renderRightIcon = () => {
        return <StyledIcon size={20} source={Images.icons.calendar} />;
    };

    return (
        <View>
            <DateTimePickerModal
                isVisible={isVisible}
                mode={mode}
                date={value ? new Date(value) : new Date()}
                {...dateTimeProps}
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />
            <StyledInput
                value={value && formatShow ? formatDate(value, formatShow) : value}
                editable={false}
                pointerEvents="none"
                renderRight={renderRightIcon}
                onPress={() => setIsVisible(true)}
                {...inputProps}
            />
        </View>
    );
};

export default StyledDateTimePicker;
