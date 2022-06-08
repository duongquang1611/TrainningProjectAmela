import { postAddTask } from 'api/modules/api-app/general';
import { updateTodo } from 'app-redux/slices/nameTodoSlice';
import { StyledInput, StyledButton } from 'components/base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface ModalContentProps {
    currentValue: any;
    handleCallback?(): void;
    handleSetValue(currentValue: any): void;
    handleIncreaseNumber?(): void;
    closeModal?(): void;
    dataID: any;
    setData(prams: any): void;
    modal: any;
    setModal(fuc: any): boolean;
}

const ModalContent = (props: ModalContentProps) => {
    const dispatch = useDispatch();
    // const { namesList } = useSelector((state: RootState) => state.nameTodo); // get data from redux
    // const { dataID } = props;
    const [addName, setAddName] = useState('');
    const [addContent, setAddContent] = useState('');

    const handleClose = () => {
        props?.closeModal?.();
    };
    const postAddTaskList = async () => {
        try {
            const responsePost = await postAddTask({
                title: addName,
                content: addContent,
            });
            dispatch(updateTodo(responsePost.data));
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddItem = () => {
        console.log('add item');

        // if (!addName && !addContent) return alert('Bạn chưa nhập gì !!! ');
        // const userId = namesList.length ? Math.max(...namesList.map((item: any) => item.id)) : 0;
        // postAddTaskList(
        //     dispatch(
        //         updateNamesList({
        //             // id: userId + 1,
        //             title: addName,
        //             content: addContent,
        //         }),
        //     ),
        // );
        // setAddName(addName);
        // setAddContent('');
        postAddTaskList();
        props?.closeModal?.();
        return null;
    };

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
            <StyledInput
                customPlaceHolder="Please fill name in the input..."
                value={addName}
                onChangeText={setAddName}
            />
            <StyledInput
                customPlaceHolder="Please fill content in input..."
                value={addContent}
                onChangeText={setAddContent}
            />
            <StyledButton title="Add Item" customStyle={styles.cssBtnAdd} onPress={handleAddItem} />
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
            <StyledButton title={'Hide'} onPress={handleClose} />
        </View>
    );
};

export default ModalContent;

const styles = StyleSheet.create({
    contModalContent: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    cssBtnAdd: {
        marginVertical: 5,
    },
});
