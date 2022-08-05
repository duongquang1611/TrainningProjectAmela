import React, { memo, useCallback, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Images from 'assets/images';
import { StyledIcon, StyledImage, StyledList, StyledText, StyledTouchable } from 'components/base';
import { Themes } from 'assets/themes';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import ModalContent from 'feature/home/components/ModalAddTaskDate';
import { deleteTask, getListTask } from 'api/modules/api-app/general';
import usePaging from '../../../hooks/usePaging';
import ModalContent2 from '../../home/components/ModalUpdateTaskDate';
import { autoRenderTaskDate } from '../../../utilities/helper';
import { TAB_NAVIGATION_ROOT } from '../../../navigation/config/routes';
import { navigate } from '../../../navigation/NavigationService';

// let onEndReachedCalledDuringMomentum = true;

const AllScreen = () => {
    // const dispatch = useDispatch();
    // const { namesList } = useSelector((state: RootState) => state.nameTodo);
    // use in component

    // use all
    // const { namesList } = store.getState().nameTodo;
    // const [isLoading, setIsloading] = useState(false);
    // const [pageCurrent, setPageCurrent] = useState(1);
    const [dataID, setDataID] = useState(1);
    // const [addName, setAddName] = useState('');
    // const [addContent, setAddContent] = useState('');
    // const [modalVisible, setModalVisible] = useState(false);
    // const [refreshing, setRefreshing] = React.useState(false);
    // const [totalPages, setTotalPages] = useState(1);
    // const [editTodo, setEditTodo] = useState({
    //     title: '',
    //     content: '',
    //     id: 0,
    // });
    const modalize = ModalizeManager();
    // const handleAddItem = () => {
    //     if (!addName && !addContent) {
    //         return alert('Bạn chưa nhập gì !!! ');
    //     }

    //     setData([{ id: Math.floor(Math.random() * 100) + 1, name: addName, content: addContent }, ...data]);
    //     setAddName('');
    //     setAddContent('');
    //     setModalVisible(!modalVisible);
    //     return null;
    // };
    // const getLiskTask = async () => {
    //     try {
    //         const responsePost = await getListTask({
    //             params: {
    //                 pageIndex: pageCurrent,
    //                 pageSize: 10,
    //                 status: 1,
    //             },
    //         });
    //         setIsloading(false);
    //         setTotalPages(responsePost.totalPages);
    //         // console.log('total', responsePost.totalPages);
    //         if (responsePost.data.length > 0) {
    //             dispatch(updateNamesList(responsePost.data));
    //         }
    //         // dispatch(updateNamesList(responsePost.data));
    //         // setTotalPages(responsePost.data);
    //         // setPageCurrent(responsePost.totalPages);

    //         // console.log(responsePost);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    const { onLoadMore, onRefresh, pagingData } = usePaging(getListTask);

    // useEffect(() => {
    //     setIsloading(true);
    //     getLiskTask();
    // }, [pageCurrent]);

    const handleDelete = async (item: any) => {
        // dispatch(deleteNamesList(namesList.filter((i: any) => i.id !== id)));
        // putTask(id, { status: 1 });
        // console.log(item);
        try {
            await deleteTask(item.id);
            onRefresh();
            // dispatch(deleteNamesList(namesList.filter((i: any) => i.id !== item.id)));
            // getLiskTask(); //cần hỏi lại xem
            // dispatch(updateTodo({ namesList: responsePost.data }));
        } catch (error) {
            console.log(error);
        }
    };
    const handleEditTodo = (todo: any) => {
        // console.log('vào đây');

        // setModalVisible(true);
        // // setEditTodo(todo);
        // <Modal
        //     setModalVisible={setModalVisible}
        //     modalVisible={modalVisible}
        //     // editTodo={editTodo}
        //     todo={todo}
        // />;
        modalize.show(
            'modalEdit',
            <ModalContent2
                onRefresh={onRefresh}
                todo={todo}
                closeModal={() => modalize.dismiss('modalEdit')}
                handleCallback={() => console.log('Test callback from modal')}
            />,
            {
                isCenter: true,
                adjustToContentHeight: true,
                disableScrollIfPossible: false,
            },
        );
    };

    // const putTask = async () => {
    //     try {
    //         await putUpdateTask(editTodo.id, {
    //             title: editTodo.title,
    //             content: editTodo.content,
    //             status: 1,
    //         });
    //         // getLiskTask();
    //         // dispatch(
    //         //     updateTodo({
    //         //         title: editTodo.title,
    //         //         content: editTodo.content,
    //         //         status: 1,
    //         //     }),
    //         // );
    //         const namesListCoppy = [...namesList];
    //         const objIndex = namesListCoppy.findIndex((i: any) => i.id === editTodo.id);
    //         namesListCoppy[objIndex] = editTodo;
    //         dispatch(updateTodo({ namesList: namesListCoppy }));
    //         // getLiskTask();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // const actionEdit = () => {
    //     console.log('edit Todo');

    //     // const namesListCoppy = [...namesList];
    //     // const objIndex = namesListCoppy.findIndex((i: any) => i.id === editTodo.id);
    //     // namesListCoppy[objIndex] = editTodo;
    //     // dispatch(updateTodo({ namesList: namesListCoppy }));
    //     setModalVisible(!modalVisible);
    //     putTask();
    // };
    // const textRef = useRef('');
    // const handleChangeEdit = useCallback((text: string) => {
    //     setEditTodo(prevEditTodo => {
    //         return { ...prevEditTodo, title: text };
    //     });
    // }, []);

    // const handleChangeEditContent = useCallback((text: string) => {
    //     setEditTodo(prevEditTodo => {
    //         return { ...prevEditTodo, content: text };
    //     });
    // }, []);

    const showModalAdd = () => {
        const arrAddDateTask = autoRenderTaskDate();
        modalize.show(
            'modalAdd',
            <ModalContent
                arrAddDateTask={arrAddDateTask}
                onRefresh={onRefresh}
                dataID={dataID}
                setData={setDataID}
                closeModal={() => modalize.dismiss('modalAdd')}
                handleCallback={() => console.log('Test callback from modal')}
            />,
            {
                isCenter: true,
                adjustToContentHeight: true,
                disableScrollIfPossible: false,
            },
        );
    };

    const renderItemTask = useCallback(
        ({ item }: any) => <Item item={item} onPress={handleDelete} onHandleEditTodo={handleEditTodo} />,
        [],
    );
    // const handleOnEndReached = () => {
    //     if (!onEndReachedCalledDuringMomentum) {
    //         // this.retrieveMore();    // LOAD MORE DATA
    //         if (pageCurrent < totalPages) {
    //             onEndReachedCalledDuringMomentum = true;
    //             setIsloading(true);
    //             setPageCurrent(pageCurrent + 1);
    //         }
    //         // this.onEndReachedCalledDuringMomentum = true;
    //         // setIsloading(true);
    //         // setIsloading(true);
    //     }
    // };
    // setPageCurrent(pageCurrent + 1);

    // const renderFooter = () => {
    //     return isLoading ? (
    //         <View style={styles.loader}>
    //             <StyledText originValue="Loading..." customStyle={{ color: '#fff', fontSize: 20 }} />
    //         </View>
    //     ) : null;
    // };
    // console.log('nameList', namesList);
    // const onRefresh = useCallback(async () => {
    //     setRefreshing(true);
    //     setPageCurrent(1);
    //     // if (namesList.length < 10) {
    //     try {
    //         await getListTask({
    //             params: {
    //                 pageIndex: pageCurrent,
    //                 pageSize: 10,
    //                 status: 1,
    //             },
    //         });
    //         // dispatch(deleteNamesList(responsePost.data));
    //         // setPageCurrent(responsePost.totalPages);

    //         // console.log(responsePost);
    //         setRefreshing(false);
    //     } catch (error) {
    //         console.error(error);
    //     }
    //     // } else {
    //     //     // ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
    //     //     setRefreshing(false);
    //     // }
    // }, [refreshing]);
    // const handleonMomentumScrollEnd = () => {
    //     isLoading && onEndReached();
    //     setIsloading(false);
    // };
    return (
        <View style={styles.containerAll}>
            <View style={styles.cssTaskbar}>
                {/* <Modal animationOut="swing" isVisible={modalVisible}>
                    <View>
                        <View style={styles.modalView}>
                            <StyledText originValue="Mời bạn sửa tại đây 😅" customStyle={styles.titInput} />
                            <StyledInput
                                customStyle={styles.cssInputAdd}
                                value={editTodo.title}
                                onChangeText={handleChangeEdit}
                            />
                            <StyledInput
                                customStyle={styles.cssInputAdd}
                                value={editTodo.content}
                                onChangeText={handleChangeEditContent}
                            />

                            <StyledButton title="Edit item" customStyle={styles.cssBtnAdd} onPress={actionEdit} />
                        </View>
                    </View>
                </Modal> */}

                <StyledTouchable onPress={showModalAdd}>
                    <StyledIcon source={Images.icons.plus} size={30} />
                </StyledTouchable>

                <StyledTouchable onPress={() => navigate(TAB_NAVIGATION_ROOT.FOLLOW_ROUTE.SEARCH)}>
                    <StyledIcon source={Images.icons.search} size={30} />
                </StyledTouchable>
            </View>
            <StyledList
                // data={namesList}
                // initialNumToRender={10}
                // onMomentumScrollBegin={() => {
                //     onEndReachedCalledDuringMomentum = false;
                // }}
                // renderItem={renderItemTask}
                // onEndReached={handleOnEndReached}
                // onEndReachedThreshold={0.05}
                // keyExtractor={(item: object, index: number) => index.toString()}
                // // onMomentumScrollEnd={handleonMomentumScrollEnd}
                // ListFooterComponent={renderFooter}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={renderItemTask}
                onRefresh={onRefresh}
                loading={pagingData.loadingMore}
                refreshing={pagingData.refreshing}
                data={pagingData.list}
                onEndReached={onLoadMore}
            />
        </View>
    );
};

const Item = memo(({ item, onPress, onHandleEditTodo }: any) => {
    return (
        <View style={styles.items}>
            <View style={styles.itemContainer}>
                <View style={styles.itemAvatar}>
                    <StyledImage
                        source={{
                            uri: `https://aos-app-order-soba-8e35e74.s3.amazonaws.com/${item.member.avatar.name}`,
                        }}
                        customStyle={styles.cssImg}
                    />
                </View>
                <View style={styles.itemName}>
                    <StyledTouchable onPress={() => onHandleEditTodo(item)}>
                        <StyledText originValue={`${item.name} ${item.id}`} customStyle={styles.textReload} />
                        <StyledText originValue={item.startDate} customStyle={styles.textReload} />
                    </StyledTouchable>
                </View>
                <StyledTouchable onPress={() => onPress(item)}>
                    <StyledIcon source={Images.icons.rash} size={30} />
                </StyledTouchable>
            </View>
        </View>
    );
});

const styles = ScaledSheet.create({
    cssIcon: {
        marginRight: '17@ms',
        marginTop: '59@vs',
    },
    containerAll: {
        flex: 1,
        backgroundColor: Themes.COLORS.black,
    },
    items: {
        width: '100%',
        height: '90@vs',
    },
    itemAvatar: {
        width: '45@s',
        height: '45@vs',
        backgroundColor: Themes.COLORS.sliver,
        borderRadius: '22@s',
        marginHorizontal: '10@ms',
    },
    itemName: {
        width: '100%',
        height: '100%',

        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '250@s',
        height: '100%',
        justifyContent: 'space-between',
    },
    textReload: {
        color: Themes.COLORS.white,
        fontSize: '17@s',
    },
    containerPlus: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    cssTitleModal: {
        fontSize: '25@s',
        marginVertical: '10@vs',
        fontWeight: 'bold',
        color: Themes.COLORS.white,
        textDecorationLine: 'underline',
    },
    buttonClose: {
        width: '90@ms',
        height: '30@s',
        backgroundColor: Themes.COLORS.red,
        position: 'relative',
        bottom: '-20@s',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10@s',
    },
    txtButtonClose: {
        color: Themes.COLORS.white,
        marginHorizontal: '18@ms',
        marginVertical: '5@vs',
        fontWeight: '700',
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkAll: {
        marginVertical: '20@vs',
    },
    cssInputAdd: {
        width: '260@s',
        height: '40@vs',
        borderRadius: '5@s',
    },
    cssBtnAdd: {
        width: '100@s',
        height: '35@vs',
        borderRadius: '10@s',
        marginTop: '40@vs',
    },
    cssAddItem: {
        color: Themes.COLORS.white,
    },

    titInput: {
        color: Themes.COLORS.white,
        fontWeight: 'bold',
        marginVertical: '20@s',
        fontSize: '15@s',
    },
    loader: {
        marginTop: '10@vs',
        alignItems: 'center',
    },
    cssImg: {
        width: '100%',
        borderRadius: '50@s',
        height: '100%',
    },
    cssTaskbar: {
        width: '100%',
        height: '50@vs',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});
export default AllScreen;
