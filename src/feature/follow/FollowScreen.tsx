/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Images from 'assets/images';
import { StyledButton, StyledIcon, StyledInput, StyledList, StyledText, StyledTouchable } from 'components/base';
import { Themes } from 'assets/themes';
import HeaderLogAndRegister from 'feature/authentication/HeaderLogAndRegister';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DATA, dataTest } from 'utilities/staticData';
import { TOP_TAB } from 'navigation/config/routes';
import Modal from 'react-native-modal';

function AllScreen() {
    return (
        <View style={styles.containerAll}>
            <StyledList
                data={DATA}
                numColumns={1}
                renderItem={({ item }: any) => <Item nameItem={item.name} id={item.id} contentItem={item.content} />}
            />
        </View>
    );
}
const Item = ({ nameItem, contentItem }: any) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemContainer}>
                <View style={styles.itemAvatar} />
                <View style={styles.itemName}>
                    <StyledText i18nText={nameItem} customStyle={styles.textReload} />
                    <StyledText i18nText={contentItem} customStyle={styles.textReload} />
                </View>
                <StyledIcon source={Images.icons.rash} size={30} />
            </View>
        </View>
    );
};
function NoreadScreen() {
    const [count, setCount] = useState(0);
    const handlePlus = () => {
        if (count < 10) {
            setCount(count + 1);
        }
    };
    const handleMinus = () => {
        if (count <= 10 && count > 0) setCount(count - 1);
    };
    return (
        <View style={styles.containerPlus}>
            <StyledTouchable onPress={handlePlus}>
                <View style={styles.plus}>
                    <StyledText customStyle={styles.cssPlusAndMinus} originValue={'+'} />
                </View>
            </StyledTouchable>
            <Text style={{ padding: 20, color: Themes.COLORS.green, fontSize: 30 }}>{count}</Text>
            <StyledTouchable onPress={handleMinus}>
                <View style={styles.minus}>
                    <StyledText customStyle={styles.cssPlusAndMinus} originValue={'-'} />
                </View>
            </StyledTouchable>
        </View>
    );
}
const start = 0.5;
let timeReal = start * 60;
let interval: any;
function SeenScreen() {
    const [results, setResults] = useState<any>([]);
    const [randomQuestions, setRandomQuestions] = useState<any>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [checkReup, setCheckReup] = useState(false);
    const [time, setTime] = useState<any>(false);
    const filterCheckFinal = results.filter((i: any) => i.isTrue === true);
    const checkDone = filterCheckFinal.length;
    const plusMark = checkDone * 0.3;
    // let timeReal = start * 60;
    const handleSelectAnswer = (item: any) => {
        const filtered = results.filter((i: any) => i.questionId !== item.questionId);
        setResults([...filtered, item]);
    };
    const handleCheckFinal = () => {
        setModalVisible(true);
    };
    const handleReupCheck = () => {
        setModalVisible(!modalVisible);
        setCheckReup(true);
    };

    useEffect(() => {
        const data = dataTest?.data?.questions;
        const randomIndexs: any = [];
        while (randomIndexs.length < 30) {
            const randomIndex = Math.floor(Math.random() * data.length);
            if (!randomIndexs.includes(randomIndex)) {
                randomIndexs.push(randomIndex);
            }
        }
        const filterRandomQuestions = data.filter((item, index: number) => {
            return randomIndexs.includes(index);
        });
        setRandomQuestions(filterRandomQuestions);
    }, []);
    useEffect(() => {
        if (time) {
            interval = setInterval(() => {
                // const hours = Math.floor(totalSeconds / 3600);
                // totalSeconds %= 3600;
                // const minutes = Math.floor(totalSeconds / 60);
                // const seconds = totalSeconds % 60;
                // totalSeconds--;
                // setTime(`${hours} : ${minutes} : ${seconds}`);
                const minutes = Math.floor(timeReal / 60);
                const second = timeReal % 60;
                const hours = 0;
                timeReal--;

                setTime(`${hours} : ${minutes} : ${second}`);
                if (hours === 0 && second === 0) {
                    setModalVisible(true);
                    clearInterval(interval);
                }
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [time]);

    return (
        <View style={styles.containerMultipleChoice}>
            <View style={styles.vocabulary}>
                <View style={styles.titleVocabulary}>
                    <View style={styles.timeTest}>
                        <StyledText i18nText={'vocabulary.grammar'} customStyle={styles.cssVocabulary} />
                        <StyledText originValue={time} customStyle={styles.cssTime} />
                    </View>
                    <View style={styles.testComplete}>
                        <Modal
                            animationType="slide"
                            backdropOpacity={0.7}
                            backdropColor="black"
                            hasBackdrop={true}
                            transparent={true}
                            visible={modalVisible}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <StyledText originValue="Hoàn Thành " customStyle={styles.cssTitleModal} />
                                    <StyledText
                                        originValue={`Số câu đúng / tổng :  ${checkDone}/30`}
                                        customStyle={styles.checkAll}
                                    />
                                    <StyledText originValue={`Điểm số : ${plusMark}`} customStyle={styles.checkAll} />
                                    <StyledText
                                        originValue={`Thời gian hoàn thành : ${time}`}
                                        customStyle={styles.checkAll}
                                    />
                                    <Pressable style={styles.buttonClose} onPress={handleReupCheck}>
                                        <StyledText originValue="Xem Lại" customStyle={styles.txtButtonClose} />
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <StyledTouchable onPress={handleCheckFinal}>
                            <View style={styles.cssComplete}>
                                <StyledText i18nText={'vocabulary.complete'} customStyle={styles.cssButtomComplete} />
                            </View>
                        </StyledTouchable>
                    </View>
                </View>
                <View style={styles.titleVocabularyBottom}>
                    <StyledText i18nText={'vocabulary.title'} customStyle={styles.csstitleVocabularyBottom} />
                </View>
            </View>

            <View style={styles.titleTest}>
                <TouchableOpacity onPress={() => setTime(!time)}>
                    <StyledText
                        originValue="Start Test"
                        customStyle={{ fontWeight: 'bold', color: Themes.COLORS.white, fontSize: 20 }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.contentTest}>
                <View style={styles.containerContent}>
                    <StyledList
                        data={randomQuestions}
                        numColumns={1}
                        renderItem={({ item, index }: any) => (
                            <View style={styles.separator}>
                                <ItemQuestion
                                    item={item}
                                    indexQuestion={index}
                                    onPress={handleSelectAnswer}
                                    results={results}
                                    checkReup={checkReup}
                                />
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    );
}

const ItemQuestion = ({ item, indexQuestion, onPress, results, checkReup }: any) => {
    const answers = dataTest?.data?.answers.filter(i => i.questionId === item.id);

    const renderItemAnswer = (i: any, index: number) => {
        const selected = results.find((itemResult: any) => itemResult.id === i.id);
        console.log(selected);
        const getStyleText = () => {
            // if (checkReup && i.isTrue && selected) {
            //     return 'green';
            // }
            if (!checkReup && selected) {
                return 'blue';
            }
            // if (checkReup && selected && i.isTrue) {
            //     return 'green';
            // }
            // if (checkReup && !selected && i.isTrue === true) {
            //     return 'green';
            // }
            if (checkReup) {
                if (i.isTrue) {
                    return 'green';
                }
                if (selected) {
                    return 'red';
                }

                return 'black';
            }
            // if (checkReup && selected && i.isTrue) return 'green';

            // if (checkReup && i.isTrue && !selected === true) {
            //     return 'green';
            // }
            // console.log(checkReup && i.isTrue === true);
        };
        return (
            <StyledTouchable
                disabled={checkReup}
                key={i.id}
                onPress={() => {
                    if (!selected) {
                        onPress(i);
                    }
                }}>
                <StyledText
                    originValue={`${index + 1} ${i.answer}`}
                    customStyle={[styles.cssAnswer, { color: getStyleText() }]}
                />
            </StyledTouchable>
        );
    };

    return (
        <View style={styles.containerContent}>
            <View style={styles.cssSTT}>
                <StyledText originValue={`${indexQuestion + 1}`} customStyle={styles.cssNumberQuestion} />
            </View>
            <StyledText originValue={item.question} customStyle={styles.cssQuestion} />
            {answers && answers.length > 0 && answers.map(renderItemAnswer)}
        </View>
    );
};

const Tab = createMaterialTopTabNavigator();
const FollowScreem = () => {
    return (
        <View style={styles.container}>
            <HeaderLogAndRegister
                title={'follow.title'}
                customStyle={styles.txtTitle}
                img={Images.icons.plus}
                customStyleIcon={styles.cssIcon}
            />
            <View style={styles.main}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { color: Themes.COLORS.white },
                        tabBarStyle: { backgroundColor: Themes.COLORS.black },
                    }}>
                    <Tab.Screen name={TOP_TAB.ALL} component={AllScreen} />
                    <Tab.Screen name={TOP_TAB.NOREAD} component={NoreadScreen} />
                    <Tab.Screen name={TOP_TAB.SEEN} component={SeenScreen} />
                </Tab.Navigator>
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        backgroundColor: Themes.COLORS.black,
    },
    txtTitle: {
        color: Themes.COLORS.white,
        fontSize: '24@s',
        marginLeft: '17@ms',
        marginTop: '59@vs',
    },
    cssIcon: {
        marginRight: '17@ms',
        marginTop: '59@vs',
    },
    containerAll: {
        flex: 1,
        backgroundColor: Themes.COLORS.black,
    },
    item: {
        width: '100%',
        height: '80@vs',
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
    plus: {
        width: 50,
        height: 50,
        backgroundColor: Themes.COLORS.sliver,
        alignItems: 'center',
        justifyContent: 'center',
    },
    minus: {
        width: 50,
        height: 50,
        backgroundColor: Themes.COLORS.sliver,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cssPlusAndMinus: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    containerMultipleChoice: {
        flex: 1,
        marginHorizontal: '20@ms',
    },
    vocabulary: {
        flex: 0.9,
        backgroundColor: '#fff',
        marginVertical: '8@vs',
    },
    titleTest: {
        flex: 0.5,
        backgroundColor: 'red',
        marginVertical: '2@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentTest: {
        flex: 3,
        backgroundColor: Themes.COLORS.white,
        marginVertical: '8@s',
    },
    titleVocabulary: {
        flex: 1.8,
        backgroundColor: Themes.COLORS.white,
        flexDirection: 'row',
    },
    titleVocabularyBottom: {
        flex: 1.3,
        backgroundColor: Themes.COLORS.darkOrange,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeTest: {
        width: '60%',
        height: '100%',
    },
    cssVocabulary: {
        fontSize: '13@s',
        marginHorizontal: '10@ms',
        marginVertical: '5@vs',
    },

    cssTime: {
        fontSize: '13@s',
        marginHorizontal: '10@ms',
        marginVertical: '5@vs',
        color: Themes.COLORS.red,
        fontWeight: 'bold',
    },
    cssComplete: {
        backgroundColor: Themes.COLORS.darkOrange,
        width: '60@s',
        height: '30@s',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '3@s',
    },
    testComplete: {
        width: '40%',
        height: '100%',
        justifyContent: 'center',
        marginLeft: '60@ms',
    },
    cssButtomComplete: {
        fontSize: '10@s',
        color: Themes.COLORS.white,
        fontWeight: 'bold',
    },
    csstitleVocabularyBottom: {
        fontSize: '16@s',
        color: Themes.COLORS.white,
        fontWeight: 'bold',
    },

    containerContent: {
        flex: 1,
    },
    separator: {
        width: '100%',
        height: 'auto',
        paddingVertical: '20@vs',
        borderWidth: 1,
        borderColor: Themes.COLORS.LightGray,
        shadowRadius: 1,
    },
    cssNumberQuestion: {
        fontWeight: '700',
        fontSize: '18@s',
    },
    centeredView: {
        width: '300@ms',
        height: '300@vs',
        backgroundColor: Themes.COLORS.textSecondary,
        alignSelf: 'center',
        borderRadius: '10@s',
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
    cssSTT: {
        width: '40@s',
        height: '30@vs',
        borderWidth: '1@s',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '15@s',
        marginVertical: '10@vs',
        borderColor: Themes.COLORS.LightGray,
    },
    cssQuestion: {
        marginLeft: '15@s',
    },
    cssAnswer: {
        marginLeft: '15@s',
    },
});

export default FollowScreem;
