import React, { useEffect, useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { SafeAreaView, View } from 'react-native';
import { StyledButton, StyledInput, StyledList, StyledText } from 'components/base';
import { getSearchUser } from 'api/modules/api-app/general';
import { debounce } from 'lodash';
import usePaging from '../../hooks/usePaging';

// const getUser = (pageIndex: number, pageSize: number, keyword: string): Promise<any> => {
//     return request.get(`/v1/app/task/search-users?&pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`);
// };
const SearchUser = () => {
    const [find, setFind] = useState('');
    // const arrAccount: any[] = [];

    // for (let i = 4; i <= 100; i += 1) {
    //     // arrAccount.push({ username: `long00${i}`, password: '123456' });
    //     if (i > 99) {
    //         arrAccount.push({ username: `long${i}`, password: '123456' });
    //     } else if (i >= 10) {
    //         arrAccount.push({ username: `long0${i}`, password: '123456' });
    //     } else {
    //         arrAccount.push({ username: `long00${i}`, password: '123456' });
    //     }
    // }
    // console.log('arr', arrAccount);

    // const [isLoading, setIsLoading] = useState(false);
    const { onLoadMore, onRefresh, pagingData, setParams } = usePaging(getSearchUser, {
        keyword: '',
    });

    useEffect(
        debounce(() => {
            setParams({ keyword: find });
        }, 1000),
        [find],
    );

    // const getUser = async () => {
    //     try {
    //         setIsLoading(true);
    //         const res = await getSearchUser();
    //         dispatch(searchUSer(res.data));
    //     } catch (error) {
    //         alert(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleFind = async () => {
        try {
            // setIsLoading(true);
            setParams({ keyword: find });
        } catch (error) {
            console.log(error);
        }
    };
    const listItem = ({ item }: any) => {
        return <Item item={item} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <StyledInput
                    customPlaceHolder="Nhập user cần tìm kiếm ..."
                    customStyle={styles.cssInput}
                    onChangeText={debounce(setFind, 1000)}
                />

                <StyledButton title="Tìm" customStyle={styles.cssBtn} onPress={handleFind} />
            </View>
            <StyledText originValue={find} />
            {/* <ActivityIndicator color={Themes.COLORS.red} /> */}
            {/* <StyledOverlayLoading visible={isLoading} /> */}
            <View style={styles.middle}>
                <StyledList
                    renderItem={listItem}
                    onRefresh={onRefresh}
                    loading={pagingData.loadingMore}
                    refreshing={pagingData.refreshing}
                    data={pagingData.list}
                    onEndReached={onLoadMore}
                />
            </View>
        </SafeAreaView>
    );
};

const Item = ({ item }: any) => {
    // console.log('item', item);
    return (
        <View style={styles.cssItem} key={item.id}>
            <StyledText originValue={`userName : ${item.username}`} />
            <StyledText originValue={`fullName : ${item.fullName}`} />
            <StyledText originValue={`email : ${item.email}`} />
            <StyledText originValue={`phone : ${item.phone}`} />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    cssInput: {
        width: '300@s',
        borderWidth: '1@s',
    },
    cssBtn: {
        width: '50@s',
        height: '50@s',
        borderRadius: '2@s',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    middle: {
        flex: 9.5,
    },
    cssItem: {
        width: '100%',
        height: 'auto',
        borderWidth: '1@s',
        marginVertical: '10@vs',
    },
});

export default SearchUser;
