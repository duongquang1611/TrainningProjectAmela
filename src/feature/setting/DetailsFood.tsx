import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, Animated } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { StyledImage, StyledText } from '../../components/base';
import StyledHeader from '../../components/common/StyledHeader';

const DetailFoods = ({ route }: any) => {
    const { item } = route.params;
    const animatedValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 100,
            duration: 1000,
            delay: 1200,
            useNativeDriver: false,
        }).start();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <StyledHeader title={'Detail Food'} customStyle={{ paddingTop: 0 }} />
            <View style={styles.banner}>
                <SharedElement id={`item.${item.id}.img`}>
                    <StyledImage source={item.img} customStyle={styles.cssImg} />
                </SharedElement>
                <Animated.Text style={[{ marginLeft: animatedValue, marginVertical: 10 }, styles.nameProduct]}>
                    {item.name}
                </Animated.Text>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <StyledText originValue="Mô tả :" customStyle={styles.descriptionProduct} />
                    <Animated.Text
                        style={[
                            styles.description,
                            {
                                transform: [
                                    {
                                        translateY: animatedValue,
                                    },
                                    {
                                        translateY: animatedValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, scale(-55)],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                ],
                                opacity: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 100],
                                }),
                            },
                        ]}>
                        - Ngon , Bổ , Rẻ
                    </Animated.Text>
                    <View style={styles.comments}>
                        <Animated.Text
                            style={[
                                styles.description,
                                {
                                    opacity: animatedValue.interpolate({
                                        inputRange: [0, 100],
                                        outputRange: [0, 100],
                                    }),
                                },
                            ]}>
                            5 sao
                        </Animated.Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

DetailFoods.sharedElements = (route: any) => {
    const { item } = route.params;
    return [
        {
            id: `item.${item.id}.img`,
            animation: 'remove',
            resize: 'clip',
            align: 'top',
        },
    ];
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        width: '100%',
        height: '200@s',
    },
    cssImg: {
        width: '100%',
        height: '100%',
    },
    description: {
        fontSize: '18@s',
        fontWeight: 'bold',
    },
    nameProduct: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    descriptionProduct: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        marginLeft: 20,
    },
    comments: {
        flexDirection: 'row',
        marginTop: 0,
        marginLeft: -120,
    },
});

export default DetailFoods;
