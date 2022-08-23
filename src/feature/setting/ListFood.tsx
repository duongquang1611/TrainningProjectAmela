import React, { useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { ScaledSheet } from 'react-native-size-matters';
import Images from '../../assets/images';
import { Themes } from '../../assets/themes';
import { StyledImage, StyledList, StyledText, StyledTouchable } from '../../components/base';
import { TAB_NAVIGATION_ROOT } from '../../navigation/config/routes';
import { navigate } from '../../navigation/NavigationService';

const dataFood = [
    {
        id: 1,
        name: 'Hamberger thịt nướng',
        img: Images.photo.foodItem_one,
    },
    {
        id: 2,
        name: 'Hamberger thịt lợn',
        img: Images.photo.foodItem_two,
    },
    {
        id: 3,
        name: 'Hamberger thịt chó',
        img: Images.photo.foodItem_three,
    },
    {
        id: 4,
        name: 'Hamberger trứng',
        img: Images.photo.foodItem_four,
    },
];

const ProductsItem = () => {
    const handleRenderFood = useCallback(({ item }: any) => {
        const navigationDetails = () => {
            navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.DETAILS, {
                item,
            });
        };
        return (
            <StyledTouchable onPress={navigationDetails}>
                <View style={styles.itemFood} key={item.id}>
                    <View style={styles.avatarItemFood}>
                        <SharedElement id={`item.${item.id}.img`}>
                            <StyledImage
                                source={item.img}
                                customStyle={styles.cssItemAvatarFood}
                                resizeMode="contain"
                            />
                        </SharedElement>
                    </View>

                    <View style={styles.content}>
                        <StyledText originValue={item.name} />
                    </View>
                </View>
            </StyledTouchable>
        );
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <StyledText originValue="List-Product" customStyle={styles.titleHeader} />
            </SafeAreaView>
            <View style={styles.listProducts}>
                <StyledList data={dataFood} renderItem={handleRenderFood} />
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listProducts: {
        flex: 8,
        backgroundColor: Themes.COLORS.grey,
    },
    titleHeader: {
        fontWeight: 'bold',
        fontSize: '20@s',
    },
    itemFood: {
        width: '100%',
        height: '100@s',
        backgroundColor: Themes.COLORS.LightGray,
        flexDirection: 'row',
    },
    avatarItemFood: {
        width: '30%',
        height: '100%',
    },
    cssItemAvatarFood: {
        width: '100%',
        height: '100%',
    },
    content: {
        width: '70%',
        height: '100%',
        backgroundColor: Themes.COLORS.white,
    },
});
export default ProductsItem;
