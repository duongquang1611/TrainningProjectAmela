import { getListTask } from 'api/modules/api-app/general';
import { Themes } from 'assets/themes';
import { StyledList, StyledText } from 'components/base';
import usePaging from 'hooks/usePaging';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { View } from 'react-native';
// import { StyleSheet, View } from 'react-native';
// import { StyledButton } from 'components/base';
// import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { ScaledSheet } from 'react-native-size-matters';

const SettingView: FunctionComponent = () => {
    const [data, setData] = useState([]);
    const getLiskTask = async () => {
        try {
            const responsePost = await getListTask({
                params: {
                    pageIndex: 1,
                    pageSize: 50,
                    status: 1,
                },
            });
            setData(responsePost.data);
        } catch (error) {
            console.log(error);
        }
    };
    const renderItem = ({ item }: any) => {
        return <Item item={item} />;
    };
    useEffect(() => {
        getLiskTask();
    }, []);
    const { onLoadMore, onRefresh, pagingData } = usePaging({ blockStatus: 2 });
    return (
        <View style={styles.container}>
            <StyledList
                onRefresh={onRefresh}
                loading={pagingData.loadingMore}
                refreshing={pagingData.list?.length ? false : pagingData.refreshing}
                data={data}
                onEndReached={onLoadMore}
                renderItem={renderItem}
            />
        </View>
    );
};
const Item = ({ item }: any) => {
    return (
        <View style={styles.containerItem}>
            <StyledText originValue={`${item.title}${item.id}`} />
            <StyledText originValue={item.content} />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        marginHorizontal: '20@ms',
        backgroundColor: Themes.COLORS.white,
    },
    containerItem: {
        flex: 1,
    },
});

export default SettingView;
