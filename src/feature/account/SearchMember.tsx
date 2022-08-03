import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { SafeAreaView, View } from 'react-native';
import { StyledImage, StyledList, StyledText } from 'components/base';
import { getMemberSearch } from '../../api/modules/api-app/general';
import usePagingTakeAfter from '../../hooks/usePagingTakeAfter';
import { Themes } from '../../assets/themes';
import { severIMG } from '../../utilities/staticData';
import StyledHeader from '../../components/common/StyledHeader';

const SearchMember = () => {
    const { list, refreshing, loadingMore, onRefresh, onLoadMore } = usePagingTakeAfter(getMemberSearch);
    const handleItemSearch = ({ item }: any) => {
        return <ItemSearch item={item} />;
    };
    return (
        <SafeAreaView style={styles.container}>
            <StyledHeader title="Search Member" />

            <View style={styles.body}>
                <StyledList
                    renderItem={handleItemSearch}
                    onRefresh={onRefresh}
                    loading={loadingMore}
                    data={list}
                    refreshing={refreshing}
                    onEndReached={onLoadMore}
                />
            </View>
        </SafeAreaView>
    );
};
const ItemSearch = ({ item }: any) => {
    const imgMember = item?.avatar?.name;
    const lastIndex = imgMember?.lastIndexOf('/');
    const checkImgProfile = imgMember?.slice(lastIndex + 1);
    return (
        <View style={styles.cssItem}>
            <View style={styles.cssImgItem}>
                <StyledImage source={{ uri: `${severIMG}${checkImgProfile}` }} customStyle={styles.cssImg} />
            </View>
            <View style={styles.boxProfile}>
                <View style={{ flexDirection: 'row' }}>
                    <StyledText originValue={'ID:'} customStyle={{ color: 'red' }} />
                    <StyledText originValue={item.id} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <StyledText originValue={'Name:'} customStyle={{ color: 'red' }} />
                    <StyledText originValue={item.name} />
                </View>
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
        backgroundColor: 'black',
    },
    contentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 3,
    },
    cssTitle: {
        width: '30%',
        height: '30@s',
        marginTop: '15@s',
        alignItems: 'center',
    },
    boxSearch: {
        width: '20%',
        height: '100@s',
    },
    txtTitle: {
        fontSize: '20@s',
        fontWeight: 'bold',
        color: Themes.COLORS.darkOrange,
    },
    cssInput: {
        width: '100%',
        height: '100%',
        fontSize: '30@s',
    },
    introBg: {
        width: '100%',
        height: '100%',
    },
    cssItem: {
        width: '400@s',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
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
});

export default SearchMember;
