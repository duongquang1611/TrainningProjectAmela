/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Themes } from 'assets/themes';
import HeaderLogAndRegister from 'feature/authentication/HeaderLogAndRegister';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TOP_TAB } from 'navigation/config/routes';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import ModalContent from 'feature/home/components/ModalContent';
import AllScreen from './components/ToptabTodo';
import NoreadScreen from './components/ToptabCallApi';
import SeenScreen from './components/ToptabTest';

const Tab = createMaterialTopTabNavigator();

const FollowScreem = () => {
    const modalize = ModalizeManager();
    const [currentValue, setCurrentValue] = useState(0);
    const showModalAdd = () => {
        modalize.show(
            'modalAdd',
            <ModalContent
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
    return (
        <View style={styles.container}>
            <HeaderLogAndRegister
                title={'follow.title'}
                customStyle={styles.txtTitle}
                // img={Images.icons.plus}
                customStyleIcon={styles.cssIcon}
                onPressIconRight={showModalAdd}
            />
            <View style={styles.main}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { color: Themes.COLORS.white },
                        tabBarStyle: { backgroundColor: Themes.COLORS.black },
                        lazy: true,
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
});

export default FollowScreem;
