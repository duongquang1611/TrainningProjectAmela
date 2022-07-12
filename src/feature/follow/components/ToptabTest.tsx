import React, { memo, useEffect, useState, useCallback } from 'react';
import { View, Pressable, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledList, StyledText, StyledTouchable } from 'components/base';
import { Themes } from 'assets/themes';
import { dataTest } from 'utilities/staticData';
import Modal from 'react-native-modal';

let interval: any;

const addZero = (innitValue: number) => {
    if (innitValue < 10) {
        return `0${innitValue}`;
    }
    return innitValue;
};

const SeenScreen = () => {
    const [results, setResults] = useState<any>([]);
    const [randomQuestions, setRandomQuestions] = useState<any>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [checkReup, setCheckReup] = useState(false);
    const [time, setTime] = useState<any>(false);
    const filterCheckFinal = results.filter((i: any) => i.isTrue === true);
    const checkDone = filterCheckFinal.length;
    const plusMark = checkDone * 0.3;

    const handleSelectAnswer = useCallback((item: any) => {
        // const filtered = results.filter((i: any) => i.questionId !== item.questionId);
        // setResults([...filtered, item]);
        // console.log(item.questionId);
        setResults((prevResults: any) => {
            const filtered = prevResults.filter((i: any) => i.questionId !== item.questionId);
            // i.questionId !== item.questionId
            return [...filtered, item];
        });
    }, []);

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
                const hours = Math.floor(timeReal / 3600);
                const minutes = Math.floor((timeReal % 3600) / 60);
                const seconds = timeReal % 60;
                // timeReal--;

                const hh = addZero(hours);
                const mm = addZero(minutes);
                const ss = addZero(seconds);
                setTime(`${hh} : ${mm} : ${ss}`);

                if (timeReal === 0) {
                    setModalVisible(true);
                    clearInterval(interval);
                }
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [time]);

    const renderItemQuestion = ({ item, index }: any) => (
        <View style={styles.separator} key={item.id}>
            <ItemQuestion item={item} indexQuestion={index} onPress={handleSelectAnswer} checkReup={checkReup} />
        </View>
    );

    const handleStartTest = () => {
        setTime(!time);
        // // dispatch(updateCount(1));
        // dispatch(updateGlobalData({ count1: 100 }));
    };

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
                            animationOut="shake"
                            backdropOpacity={0.7}
                            backdropColor="black"
                            hasBackdrop={true}
                            // transparent={true}
                            isVisible={modalVisible}>
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
                <TouchableOpacity onPress={handleStartTest}>
                    <StyledText
                        originValue="Start Test"
                        customStyle={{ fontWeight: 'bold', color: Themes.COLORS.white, fontSize: 20 }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.contentTest}>
                <View style={styles.containerContent}>
                    <StyledList data={randomQuestions} renderItem={renderItemQuestion} />
                </View>
            </View>
        </View>
    );
};
const ItemAnswer = memo(
    ({ itemAnswer, handleSelected, getStyleText, checkReup, index }: any) => {
        return (
            <StyledTouchable
                disabled={checkReup}
                key={itemAnswer.id}
                onPress={() => {
                    handleSelected(itemAnswer);
                }}>
                <StyledText
                    key={itemAnswer.id}
                    originValue={`${index + 1} ${itemAnswer.answer}`}
                    customStyle={[styles.cssAnswer, { color: getStyleText }]}
                />
            </StyledTouchable>
        );
    },
    (prevProps, nextProps) => prevProps.getStyleText === nextProps.getStyleText,
);
const ItemQuestion = memo(({ item, indexQuestion, onPress, checkReup }: any) => {
    const answers = dataTest?.data?.answers.filter(i => i.questionId === item.id);
    const [choosing, setChoosing] = useState();

    const handleSelected = (itemAnswer: any) => {
        setChoosing(itemAnswer.id);
        onPress(itemAnswer);
    };

    const renderItemAnswer = useCallback(
        (itemAnswer: any, index: number) => {
            // console.log('render Answer');
            const selected = choosing === itemAnswer.id;

            const getStyleText = () => {
                if (!checkReup && selected) {
                    return 'blue';
                }
                if (checkReup) {
                    if (itemAnswer.isTrue) {
                        return 'green';
                    }
                    if (selected) {
                        return 'red';
                    }

                    return 'black';
                }
                return 'black';
            };
            return (
                <ItemAnswer
                    itemAnswer={itemAnswer}
                    handleSelected={handleSelected}
                    getStyleText={getStyleText()}
                    checkReup={checkReup}
                    index={index}
                />
            );
        },
        [choosing, checkReup],
    );

    return (
        <View style={styles.containerContent}>
            <View style={styles.cssSTT}>
                <StyledText originValue={`${indexQuestion + 1}`} customStyle={styles.cssNumberQuestion} />
            </View>
            <StyledText key={item.id} originValue={item.question} customStyle={styles.cssQuestion} />
            {answers && answers.length > 0 && answers.map(renderItemAnswer)}
        </View>
    );
});

const styles = ScaledSheet.create({
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
        paddingTop: '10@vs',
        paddingBottom: '30@vs',
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
        marginVertical: '8@vs',
    },
    containerScreenTwo: {
        flex: 1,
    },
    cssId: {
        height: '30@s',
        width: '30@s',
        borderWidth: '2@s',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '10@vs',
        marginHorizontal: '10@ms',
    },
    cssItem: {
        borderWidth: '2@s',
        height: 'auto',
        width: '100%',
        padding: '10@s',
    },
    cssRandom: {
        justifyContent: 'center',
        backgroundColor: Themes.COLORS.red,
        width: '100@s',
        height: '30@s',
        borderWidth: '1@s',
        alignItems: 'center',
    },
    cssSubmit: {
        width: '80@s',
        height: '30@s',
        marginHorizontal: '6@s',
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
    cssAdd: {
        marginTop: '20@s',
        marginHorizontal: '170@s',
    },
    titInput: {
        color: Themes.COLORS.white,
        fontWeight: 'bold',
        marginVertical: '20@s',
        fontSize: '15@s',
    },
});

export default SeenScreen;
