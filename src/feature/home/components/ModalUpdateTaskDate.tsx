import { StyledButton, StyledInputForm } from 'components/base';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import dayjs from 'dayjs';
import { ScaledSheet } from 'react-native-size-matters';
import yupValidate from '../../../utilities/yupValidate';
import StyledDateTimePicker from '../../../components/base/picker/StyledDateTimePicker';
import { HHmm, YYYYMMDDHHmm } from '../../../utilities/format';
import { Themes } from '../../../assets/themes';
import { IParamsRender } from '../../../components/base/StyledInputForm';
import AlertMessage from '../../../components/base/AlertMessage';
import { tomorrow } from '../../../utilities/helper';
import { putUpdateTaskDate } from '../../../api/modules/api-app/general';

interface ModalContentProps {
    handleCallback?(): void;
    handleSetValue?(currentValue: number): void;
    closeModal(): void;
    todo?: any;
    onRefresh?: any;
}

const ModalUpdateDateTask = (props: ModalContentProps) => {
    const { todo, onRefresh } = props;
    const schema = yup.object().shape({
        name: yupValidate.name(),
        description: yupValidate.description(),
        startDate: yupValidate.currentDate(),
        startTime: yupValidate.currentDate(),
        endTime: yupValidate.currentDate(),
    });
    const form = useForm({
        mode: 'onChange',
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
        const updateEndTime = dayjs(timeStart).add(60, 'minute');
        setValue('endTime', updateEndTime, { shouldValidate: true });
    }, [timeStart]);

    const handleEditTaskDate = async (formData: any) => {
        const cutStartTime = formData.startTime;
        const resultStartTime = cutStartTime.split(' ', 3);
        const resultEndTime = getValues('endTime').format(HHmm);
        try {
            await putUpdateTaskDate(todo.id, {
                ...formData,
                startTime: resultStartTime[1],
                endTime: `${resultEndTime}`,
            });
            onRefresh();
            props?.closeModal?.();
        } catch (error: any) {
            AlertMessage(error);
        }
    };
    const handleCloseModal = () => {
        props?.closeModal?.();
    };

    return (
        <View style={styles.contModalContent}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
                enableResetScrollToCoords={false}>
                <FormProvider {...form}>
                    <StyledInputForm
                        name={'name'}
                        label="Name"
                        returnKeyType="next"
                        customLabelStyle={styles.cssLabel}
                        customPlaceHolder={todo.name}
                        customStyle={styles.cssInputName}
                    />
                    <StyledInputForm
                        name={'description'}
                        label="description"
                        returnKeyType="next"
                        customLabelStyle={styles.cssLabel}
                        customStyle={styles.cssInputDescription}
                        multiline={true}
                        // value={getValues('description') ? getValues('description') : todo.name}
                        // onChangeText={(text: string) => {
                        //     setValue('description', text, { shouldValidate: true });
                        // }}
                        customPlaceHolder={'description...'}
                    />
                    <View style={styles.cssAge}>
                        <StyledInputForm
                            name={'startDate'}
                            label="Start-Date"
                            InputComponent={StyledDateTimePicker}
                            customPlaceHolder={todo.startDate}
                            dateTimeProps={{
                                mode: 'date',
                                minimumDate: new Date(tomorrow),
                            }}
                            customLabelStyle={styles.cssLabel}
                        />
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
                                        placeholder={todo.startTime}
                                        label="Start-Time"
                                        formatShow={HHmm}
                                        formatTemplate={YYYYMMDDHHmm}
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
                                        placeholder={todo.endTime}
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
                    </>
                </FormProvider>
            </KeyboardAwareScrollView>
            <StyledButton
                title={'Edit-Task'}
                onPress={handleSubmit(handleEditTaskDate)}
                customStyle={[styles.button, !isValid && { backgroundColor: 'gray' }]}
                customStyleText={styles.txtBtn}
                disabled={!isValid}
            />
            <StyledButton
                title={'Hide'}
                onPress={handleCloseModal}
                customStyle={styles.button}
                customStyleText={styles.txtBtn}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    contModalContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    cssBtn: {
        marginVertical: '10@vs',
    },
    cssLabel: {
        fontWeight: 'bold',
        fontSize: '15@s',
        backgroundColor: Themes.COLORS.white,
    },
    cssAge: {
        // width: '100%',
        height: '90@vs',

        marginTop: '30@vs',
    },
    button: {
        width: '150@s',
        backgroundColor: Themes.COLORS.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: '16@s',
    },
    txtBtn: {
        color: Themes.COLORS.white,
        fontWeight: 'bold',
    },
    cssInputDescription: {
        borderWidth: '1@s',
        height: '80@vs',
        marginVertical: '8@vs',
    },
    cssInputName: {
        borderWidth: '1@s',
        marginVertical: '5@vs',
    },
});
export default ModalUpdateDateTask;
