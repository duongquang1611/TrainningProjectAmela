/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Images from 'assets/images';
import { StyledButton, StyledIcon, StyledInput, StyledList, StyledText, StyledTouchable } from 'components/base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Themes } from 'assets/themes';
import HeaderLogAndRegister from 'feature/authentication/HeaderLogAndRegister';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import en from 'assets/locates/en';
import { DATA } from 'utilities/staticData';
import { TOP_TAB } from 'navigation/config/routes';

function AllScreen() {
    return (
        <View style={styles.containerAll}>
            <StyledList
                data={DATA}
                numColumns={1}
                renderItem={({ item }) => <Item nameItem={item.name} id={item.id} contentItem={item.content} />}
            />
        </View>
    );
}
const Item = ({ nameItem, contentItem }) => {
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
                    <StyledText customStyle={styles.cssPlusAndMinus} i18nText={'+'} />
                </View>
            </StyledTouchable>
            <Text style={{ padding: 20, color: Themes.COLORS.green, fontSize: 30 }}>{count}</Text>
            <StyledTouchable onPress={handleMinus}>
                <View style={styles.minus}>
                    <StyledText customStyle={styles.cssPlusAndMinus} i18nText={'-'} />
                </View>
            </StyledTouchable>
        </View>
    );
}
function SeenScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}
const Tab = createMaterialTopTabNavigator();
const FollowScreem = () => {
    const { introImage } = Images.photo;

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
                        tabBarLabelStyle: { color: Themes.COLORS.white, fontSize: '13@s' },
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
});

export default FollowScreem;
