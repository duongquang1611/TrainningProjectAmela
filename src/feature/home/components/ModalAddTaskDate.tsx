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
import { HHmm, YYYYMMDDHHmm, YYYYMMDDT } from '../../../utilities/format';
import { Themes } from '../../../assets/themes';
import { IParamsRender } from '../../../components/base/StyledInputForm';
import { postAddDateTask } from '../../../api/modules/api-app/general';
import AlertMessage from '../../../components/base/AlertMessage';

interface ModalContentProps {
    currentValue?: any;
    handleCallback?(): void;
    handleSetValue?(currentValue: any): void;
    handleIncreaseNumber?(): void;
    closeModal?(): void;
    dataID?: any;
    setData?(prams: any): void;
    modal?: any;
    setModal?(fuc: any): boolean;
    onRefresh?: any;
    arrAddDateTask?: any;
}

const ModalAddDate = (props: ModalContentProps) => {
    // const dispatch = useDispatch();
    // const { namesList } = useSelector((state: RootState) => state.nameTodo); // get data from redux
    const { onRefresh, arrAddDateTask } = props;
    // const [addName, setAddName] = useState('');
    // const [addContent, setAddContent] = useState('');
    // const { onRefresh } = usePaging(getListTask);

    const handleClose = () => {
        props?.closeModal?.();
    };
    // const postAddTaskList = async () => {
    //     try {
    //         const responsePost = await postAddTask({
    //             title: addName,
    //             content: addContent,
    //         });
    //         dispatch(updateTodo(responsePost.data));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
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
    const timeStart = watch('startTime');
    useEffect(() => {
        const updateEndTime = dayjs(timeStart).add(15, 'minute');
        setValue('endTime', updateEndTime, { shouldValidate: true });
    }, [timeStart]);
    // const getList = async () => {
    //     try {
    //         await getListTask({
    //             params: {
    //                 targetId: 2,
    //                 pageIndex: 1,
    //             },
    //         });
    //     } catch (error: any) {
    //         AlertMessage(error);
    //     }
    // };
    const onAddDateTask = async (formData: any) => {
        const timePlay = dayjs(formData?.startTime)?.format(HHmm);
        const resultEndTime = dayjs(formData?.endTime)?.format(HHmm);
        try {
            await postAddDateTask({
                ...formData,
                startTime: timePlay,
                endTime: resultEndTime,
            });
            onRefresh();
            props?.closeModal?.();
        } catch (error: any) {
            AlertMessage(error);
        }
    };

    const tomorrow = dayjs().add(1, 'day').format(YYYYMMDDT);
    const handleAuto = async () => {
        try {
            await Promise.all(
                arrAddDateTask.map((item: any) => {
                    const copiedItem = JSON.parse(JSON.stringify(item));
                    return postAddDateTask({
                        ...copiedItem,
                    });
                }),
            );
        } catch (error: any) {
            AlertMessage(error);
        }
    };
    // const handleAddItem = () => {
    //     console.log('add item');

    //     // if (!addName && !addContent) return alert('Bạn chưa nhập gì !!! ');
    //     // const userId = namesList.length ? Math.max(...namesList.map((item: any) => item.id)) : 0;
    //     // postAddTaskList(
    //     //     dispatch(
    //     //         updateNamesList({
    //     //             // id: userId + 1,
    //     //             title: addName,
    //     //             content: addContent,
    //     //         }),
    //     //     ),
    //     // );
    //     // setAddName(addName);
    //     // setAddContent('');
    //     postAddTaskList();
    //     props?.closeModal?.();
    //     return null;
    // };

    // handlePlusId();

    // const { handleSetValue } = props;
    // const modalize = ModalizeManager();
    // const [valuePicker, setValuePicker] = useState(dataPicker[0]);
    // const handleConfirm = (item: string) => {
    //     setValuePicker(item);
    // };
    // const handleChangeName = (text: string) => {
    //     setAddName(text);
    // };
    // const handleChangeContent = (textContent: string) => {
    //     setAddContent(textContent);
    // };
    return (
        <View style={styles.contModalContent}>
            {/* <StyledInput
                customPlaceHolder="Please fill name in the input..."
                value={addName}
                onChangeText={setAddName}
            />
            <StyledInput
                customPlaceHolder="Please fill content in input..."
                value={addContent}
                onChangeText={setAddContent}
            /> */}
            <KeyboardAwareScrollView
                // contentContainerStyle={styles.container}
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
                        customPlaceHolder={'Nhập tên'}
                    />
                    <StyledInputForm
                        name={'description'}
                        label="description"
                        returnKeyType="next"
                        customLabelStyle={styles.cssLabel}
                        multiline={true}
                        customPlaceHolder={'Nhập mô tả'}
                    />
                    <View style={{ width: '90%', height: 120, marginVertical: 30 }}>
                        <StyledInputForm
                            name={'note'}
                            label="Note"
                            returnKeyType="next"
                            customLabelStyle={styles.cssLabel}
                            multiline={true}
                            customPlaceHolder={'Nhập lưu ý'}
                        />
                    </View>
                    <View style={styles.cssAge}>
                        <StyledInputForm
                            name={'startDate'}
                            label="Start-Date"
                            InputComponent={StyledDateTimePicker}
                            customPlaceHolder={'YYYY-DD-MM'}
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
                    </>
                </FormProvider>
            </KeyboardAwareScrollView>
            <StyledButton
                title="Add Item"
                onPress={handleSubmit(onAddDateTask)}
                customStyle={[styles.button, !isValid && { backgroundColor: 'gray' }]}
                disabled={!isValid}
            />
            {/* <StyledPicker
                currentValue={valuePicker}
                dataList={dataPicker}
                onConfirm={handleConfirm}
                customStyle={{ width: '80%' }}
            />
            <StyledButton
                title={'Test alert with closing modal'}
                onPress={() => {
                    props?.closeModal?.();
                    props?.handleCallback?.();
                }}
                customStyle={{ width: '80%' }}
            />
            <StyledButton
                title={'Test alert without closing modal'}
                onPress={() => {
                    props?.handleCallback?.();
                }}
                customStyle={{ width: '80%' }}
            />
            <StyledButton
                title={'Open Modal 2'}
                onPress={() => {
                    modalize.show('modalTest2', <ModalContent2 closeModal={() => modalize.dismiss('modalTest2')} />, {
                        modalStyle: {
                            backgroundColor: Themes.COLORS.white,
                        },
                        modalTopOffset: 0,
                        adjustToContentHeight: true,
                        disableScrollIfPossible: false,
                    });
                }}
            /> */}
            <StyledButton title={'Auto-CreatTask'} onPress={handleAuto} customStyle={{ marginTop: 15 }} />
            <StyledButton title={'Hide'} onPress={handleClose} customStyle={{ marginTop: 10 }} />
        </View>
    );
};

export default ModalAddDate;

const styles = ScaledSheet.create({
    contModalContent: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
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
