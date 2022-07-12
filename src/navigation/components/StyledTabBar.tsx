import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { StyledText, StyledTouchable } from 'components/base';
import { Themes } from 'assets/themes';
import Size from 'assets/sizes';

const StyledTabBar = ({ state, descriptors, navigation }: any) => {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <StyledTouchable
                        accessibilityRole="button"
                        // accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={route.key}
                        customStyle={[styles.tabButton]}>
                        <Image
                            source={options?.icon}
                            style={[
                                styles.tabIcon,
                                { tintColor: isFocused ? Themes.COLORS.selectiveYellow : Themes.COLORS.white },
                            ]}
                        />
                        <StyledText
                            customStyle={[
                                styles.tabLabel,
                                { color: isFocused ? Themes.COLORS.selectiveYellow : Themes.COLORS.white },
                            ]}
                            i18nText={options?.title || ''}
                        />
                    </StyledTouchable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        // marginBottom: Platform.OS === 'ios' ? Metrics.safeBottomPadding : 0,

        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        // borderTopColor: Themes.COLORS.grey,
        // alignItems: Platform.OS === 'ios' ? 'flex-end' : 'center',
        height: '10%',
        backgroundColor: Themes.COLORS.ebonyClay,
    },
    tabButton: {
        alignItems: 'center',
    },
    tabIcon: {
        width: 17,
        height: 17,
        resizeMode: 'contain',
    },
    tabLabel: {
        paddingLeft: Size.PADDING.defaultTextPadding,
        textAlign: 'center',
        alignItems: 'center',
    },
});

export default StyledTabBar;
