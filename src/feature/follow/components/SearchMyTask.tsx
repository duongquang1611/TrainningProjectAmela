import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { StyledImage, StyledList, StyledText, StyledTouchable } from 'components/base';
import StyledInputForm, { IParamsRender } from 'components/base/StyledInputForm';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScaledSheet } from 'react-native-size-matters';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View } from 'react-native';
import dayjs from 'dayjs';
import { HHmm, YYYYMMDDHHmm } from '../../../utilities/format';
import { getSearchTask } from '../../../api/modules/api-app/general';
import StyledDateTimePicker from '../../../components/base/picker/StyledDateTimePicker';
import { tomorrow } from '../../../utilities/helper';
import usePaging from '../../../hooks/usePaging';
import StyledHeader from '../../../components/common/StyledHeader';
import { linkIMG } from '../../../utilities/staticData';

const SearchMyTask = () => {
    const schema = yup.object().shape({
        startDate: yupValidate.currentDate(),
        startTime: yupValidate.startTime(),
        endTime: yupValidate.endTime(),
    });
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError',
    });
    const {
        formState: { isValid },
        handleSubmit,
    } = form;

    const handleSearchTask = async (formData: any) => {
        const timeStart = dayjs(formData?.startTime)?.format(HHmm);
        const timeEnd = dayjs(formData?.endTime)?.format(HHmm);
        try {
            setParams({ ...formData, startTime: timeStart, endTime: timeEnd });
        } catch (error) {
            console.log(error);
        }
    };
    const handleItemSearch = ({ item }: any) => {
        return <ItemSearch item={item} />;
    };
    const { onLoadMore, onRefresh, pagingData, setParams } = usePaging(getSearchTask);

    return (
        <>
            <StyledHeader title="Search My Task" />
            <View style={styles.container}>
                <View style={styles.topScreen}>
                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps="handled"
                        enableOnAndroid={true}
                        showsVerticalScrollIndicator={false}
                        enableResetScrollToCoords={false}>
                        <FormProvider {...form}>
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
                            onPress={handleSubmit(handleSearchTask)}
                            customStyle={[styles.button, !isValid && { backgroundColor: 'gray' }]}
                            disabled={!isValid}>
                            <StyledText originValue="Search Task" customStyle={styles.textButton} />
                        </StyledTouchable>
                    </KeyboardAwareScrollView>
                </View>
                <View style={styles.bottomScreen}>
                    <StyledList
                        renderItem={handleItemSearch}
                        onRefresh={onRefresh}
                        loading={pagingData.loadingMore}
                        refreshing={pagingData.refreshing}
                        data={pagingData.list}
                        onEndReached={onLoadMore}
                    />
                </View>
            </View>
        </>
    );
};
const StyledItemSearch = ({ title, content }: any) => {
    return (
        <View style={styles.cssRowItem}>
            <StyledText originValue={`${title} : `} customStyle={{ color: 'red' }} />
            <StyledText originValue={content} />
        </View>
    );
};
const ItemSearch = ({ item }: any) => {
    return (
        <View style={styles.cssItem}>
            <View style={styles.cssImgItem}>
                <StyledImage source={{ uri: `${linkIMG}${item.member.avatar.name}` }} customStyle={styles.cssImg} />
            </View>
            <View style={styles.boxProfile}>
                <View style={styles.cssRow}>
                    <StyledItemSearch title="ID" content={item.id} />
                    <StyledItemSearch title="Name" content={item.name} />
                    <StyledItemSearch title="start-Date" content={item.startDate} />
                    <StyledItemSearch title="start-Time" content={item.startTime} />
                    <StyledItemSearch title="end-Time" content={item.endTime} />
                </View>
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: Themes.COLORS.white,
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
        alignSelf: 'center',
    },
    pickerContainer: {
        marginTop: '-5@vs',
        marginHorizontal: '20@s',
        width: '80%',
        marginBottom: '40@vs',
    },
    cssAge: {
        height: '90@vs',
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
    cssItem: {
        width: '400@s',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomWidth: '1@s',
    },
    cssImgItem: {
        width: '100@s',
        height: '100@vs',
        borderRadius: '50@s',
        marginVertical: '10@vs',
    },
    cssImg: {
        width: '100%',
        height: '100%',
        borderRadius: '50@s',
    },
    boxProfile: {
        width: '250@s',
        height: '150@vs',
        borderWidth: '1@s',
        marginVertical: '10@vs',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    topScreen: {
        flex: 2.5,
        borderBottomWidth: 5,
        borderColor: Themes.COLORS.darkOrange,
    },
    bottomScreen: {
        flex: 2,
        borderEndWidth: 1,
    },
    cssRow: {
        flexDirection: 'column',
    },
    goBack: {
        width: '80@s',
        height: '30@vs',
        backgroundColor: 'red',
        marginTop: '40@vs',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cssIconBack: {
        tintColor: Themes.COLORS.white,
        marginLeft: '15@s',
    },
    cssRowItem: {
        flexDirection: 'row',
    },
});

export default SearchMyTask;
