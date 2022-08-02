import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
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
import StyledDateTimePicker from '../../components/base/picker/StyledDateTimePicker';
import StyledHeader from '../../components/common/StyledHeader';
import { HHmm, YYYYMMDDHHmm } from '../../utilities/format';
import { postAddDateTask } from '../../api/modules/api-app/general';
import { tomorrow } from '../../utilities/helper';

const AccountTaskTrainning = () => {
    const schema = yup.object().shape({
        name: yupValidate.name(),
        description: yupValidate.description(),
        note: yupValidate.note(),
        startDate: yupValidate.currentDate(),
        startTime: yupValidate.currentDate(),
        endTime: yupValidate.currentDate(),
    });
    const form = useForm({
        mode: 'onChange',
        // defaultValues: DEFAULT_FORM,
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
        handleSubmit,
        setValue,
        watch,
        getValues,
    } = form;
    const timeStart = watch('startTime');
    useEffect(() => {
        const updateEndTime = dayjs(timeStart).add(15, 'minute');
        setValue('endTime', updateEndTime, { shouldValidate: true });
    }, [timeStart]);
    const onAddDateTask = async (formData: any) => {
        const cutStartTime = formData.startTime;
        const resultStartTime = cutStartTime.split(' ');
        const resultEndTime = getValues('endTime').format(HHmm);
        try {
            await postAddDateTask({
                ...formData,
                startTime: resultStartTime[1],
                endTime: resultEndTime,
            });
        } catch (error: any) {
            AlertMessage(error);
        }
    };
    return (
        <>
            <StyledHeader title={'Create Add Task'} isBack={true} />

            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
                enableResetScrollToCoords={false}>
                <FormProvider {...form}>
                    <StyledInputForm name={'name'} label="Name" customLabelStyle={styles.cssLabel} />
                    <StyledInputForm
                        name={'description'}
                        label="description"
                        customLabelStyle={styles.cssLabel}
                        multiline={true}
                    />
                    <View style={styles.cssNote}>
                        <StyledInputForm
                            name={'note'}
                            label="Note"
                            customLabelStyle={styles.cssLabel}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.cssAge}>
                        <StyledInputForm
                            name={'startDate'}
                            label="Start-Date"
                            InputComponent={StyledDateTimePicker}
                            dateTimeProps={{
                                mode: 'date',
                                minimumDate: new Date(tomorrow),
                            }}
                            customLabelStyle={styles.cssLabel}
                        />
                    </View>

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
                                    placeholder={HHmm}
                                    label="Start-Time"
                                    formatShow={HHmm}
                                    formatTemplate={YYYYMMDDHHmm}
                                    mode={'time'}
                                    customLabelStyle={styles.cssLabel}
                                />
                            );
                        }}
                    />

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
                                    placeholder={HHmm}
                                    onChangeText={onChange}
                                    label="End-Time"
                                    formatShow={HHmm}
                                    formatTemplate={YYYYMMDDHHmm}
                                    mode={'time'}
                                    customLabelStyle={styles.cssLabel}
                                />
                            );
                        }}
                    />
                </FormProvider>

                <StyledTouchable
                    onPress={handleSubmit(onAddDateTask)}
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
    cssNote: {
        width: '90%',
        height: 120,
        marginVertical: 30,
    },
});

export default AccountTaskTrainning;
