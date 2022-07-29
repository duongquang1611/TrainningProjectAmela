import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { CheckBox, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInputForm, { IParamsRender } from 'components/base/StyledInputForm';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScaledSheet } from 'react-native-size-matters';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View } from 'react-native';
import dayjs from 'dayjs';
import StyledPicker from '../../components/base/picker/StyledPicker';
import { dataPicker } from '../../utilities/staticData';
import StyledDateTimePicker from '../../components/base/picker/StyledDateTimePicker';
import StyledHeader from '../../components/common/StyledHeader';
import { YYYYMMDDHHmmss } from '../../utilities/format';
import { timeToday, today } from '../../utilities/helper';

const DEFAULT_FORM: any = {
    username: 'Long',

    sex: 'nam',
    age: '21/07/2022',
};

const AccountViewValidate = () => {
    const schema = yup.object().shape({
        username: yupValidate.name(),
        password: yupValidate.password(),
        confirmPassword: yupValidate.password('password'),
        age: yupValidate.birthday(),
        policy: yupValidate.policy(),
    });
    const form = useForm({
        mode: 'onChange',
        defaultValues: DEFAULT_FORM,
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
        handleSubmit,
        setValue,
        watch,
    } = form;
    const currentDay = watch('currentDate');

    useEffect(() => {
        const minus = timeToday.getMinutes();
        const checkMinus = minus % 5;
        const addMinus = checkMinus > 0 ? 5 - checkMinus : 0;
        const addMinusEndTime = addMinus + 15;
        const updateMinus = dayjs().add(addMinus, 'minute').format(YYYYMMDDHHmmss);
        const updateMinusEndTime = dayjs().add(addMinusEndTime, 'minute').format(YYYYMMDDHHmmss);
        const checkDay = dayjs(currentDay);
        const setDate = checkDay
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
            .set('millisecond', 0)
            .format(YYYYMMDDHHmmss);

        setValue('endTime', updateMinusEndTime, { shouldValidate: true });
        if (checkDay.isAfter(today, 'day')) {
            setValue('startTime', `${setDate}`, { shouldValidate: true });
        } else {
            setValue('startTime', updateMinus, { shouldValidate: true });
        }
    }, [currentDay]);

    // console.log('check', checkDay);
    // note: for NEXT 15min interval, use Math.ceil()
    // console.log('var', newDate);
    const onSubmit = (formData: any) => {
        AlertMessage(JSON.stringify(formData), 'Form Data');
    };
    // function getAge(dateString: any) {
    //     const ageInMilliseconds = new Date().getTime() - new Date(dateString).getTime();
    //     return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
    // }
    // const checkAge = getAge(ageNumber);

    // const today = new Date();
    // const date = today.getDate();

    // console.log('time', typeof date);

    return (
        <>
            <StyledHeader title={'Training validate'} isBack={true} />

            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                // keyboardShouldPersistTaps="handled"
                // enableOnAndroid={true}
                // showsVerticalScrollIndicator={false}
                // enableResetScrollToCoords={false}
            >
                <FormProvider {...form}>
                    <StyledInputForm
                        name={'username'}
                        label="Username"
                        returnKeyType="next"
                        customLabelStyle={styles.cssLabel}
                    />
                    <StyledInputForm
                        // secureTextEntry={true}
                        name={'password'}
                        label="Password"
                        returnKeyType="next"
                        customLabelStyle={styles.cssLabel}
                    />
                    {!!watch('confirmPassword') && watch('password') !== watch('confirmPassword') && (
                        <View style={{ width: '100%', height: 20, backgroundColor: 'pink' }}>
                            <StyledText originValue="Pass với confinPass không khớp" />
                        </View>
                    )}
                    <StyledInputForm
                        name={'confirmPassword'}
                        label="Confirm Password"
                        secureTextEntry={true}
                        customLabelStyle={styles.cssLabel}
                    />

                    <StyledInputForm
                        name={'sex'}
                        label="StyledPicker"
                        InputComponent={StyledPicker}
                        dynamicOnChangeName={'onConfirm'}
                        pickerProps={{
                            label: 'Label Picker',
                            labelInput: 'Giới tính', // label UI same StyledInput
                            customLabelInputStyle: styles.cssLabel,
                            dataList: dataPicker,
                            customStyle: styles.pickerContainer,
                        }}
                    />

                    <View style={styles.cssAge}>
                        <StyledInputForm
                            name={'currentDate'}
                            label="Ngày hiện tại"
                            InputComponent={StyledDateTimePicker}
                            customLabelStyle={styles.cssLabel}
                        />

                        <StyledInputForm
                            name={'currentDate'}
                            customLabelStyle={styles.cssLabel}
                            renderBaseInput={({ field, fieldState }: IParamsRender) => {
                                const { value, onChange } = field;
                                const { error } = fieldState;

                                return (
                                    <StyledDateTimePicker
                                        errorMessage={error?.message}
                                        value={value}
                                        onChangeText={onChange}
                                        label="currentDate"
                                        formatTemplate={YYYYMMDDHHmmss}
                                        mode={'time'}
                                        customLabelStyle={styles.cssLabel}
                                    />
                                );
                            }}
                        />
                        {/* {!!checkAge && checkAge < 5 && (
                            <View style={{ width: '100%', height: 20, backgroundColor: 'pink' }}>
                                <StyledText originValue="Phải lớn hơn 5 tuổi" />
                            </View>
                        )} */}
                        {/* {!!converntDay && converntDay < date && (
                            <View style={{ width: '100%', height: 20, backgroundColor: 'pink' }}>
                                <StyledText originValue="Không dược chọn ngày của quá khứ" />
                            </View>
                        )} */}
                    </View>
                    <>
                        <StyledInputForm
                            name={'startTime'}
                            customLabelStyle={styles.cssLabel}
                            renderBaseInput={({ field, fieldState }: IParamsRender) => {
                                const { value, onChange } = field;
                                const { error } = fieldState;

                                return (
                                    <StyledDateTimePicker
                                        errorMessage={error?.message}
                                        value={value}
                                        onChangeText={onChange}
                                        label="Start-Time"
                                        formatTemplate={YYYYMMDDHHmmss}
                                        mode={'time'}
                                        customLabelStyle={styles.cssLabel}
                                    />
                                );
                            }}
                        />
                    </>
                    <>
                        <StyledInputForm
                            name={'endTime'}
                            customLabelStyle={styles.cssLabel}
                            renderBaseInput={({ field, fieldState }: IParamsRender) => {
                                const { value, onChange } = field;
                                const { error } = fieldState;
                                return (
                                    <StyledDateTimePicker
                                        errorMessage={error?.message}
                                        value={value}
                                        onChangeText={onChange}
                                        label="End-Time"
                                        formatTemplate={YYYYMMDDHHmmss}
                                        mode={'time'}
                                        customLabelStyle={styles.cssLabel}
                                    />
                                );
                            }}
                        />
                    </>
                    <StyledInputForm
                        name={'policy'}
                        InputComponent={CheckBox}
                        dynamicOnChangeName={'onConfirm'}
                        checkBoxProps={{ content: 'Term & policy', customStyle: styles.checkBoxContainer }}
                    />
                </FormProvider>

                <StyledTouchable
                    onPress={handleSubmit(onSubmit)}
                    customStyle={[styles.button, !isValid && { backgroundColor: 'gray' }]}
                    disabled={!isValid}>
                    <StyledText originValue="Submit" customStyle={styles.textButton} />
                </StyledTouchable>
            </KeyboardAwareScrollView>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
    },
    button: {
        width: '150@s',
        marginTop: 5,
        backgroundColor: Themes.COLORS.blue,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: '16@s',
    },
    pickerContainer: {
        marginTop: '-5@vs',
        marginHorizontal: '20@s',
        width: '80%',
        marginBottom: '40@vs',
    },
    cssAge: {
        // width: '100%',
        height: '90@vs',

        marginTop: '-50@vs',
    },
    cssLabel: {
        fontWeight: 'bold',
        fontSize: '15@s',
        backgroundColor: Themes.COLORS.white,
    },
    checkBoxContainer: {
        marginVertical: '5@vs',
        width: '80%',
    },
});

export default AccountViewValidate;
