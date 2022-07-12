import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledButton, StyledList, StyledText } from 'components/base';
import { Themes } from 'assets/themes';
import { getPostFour, getPostOne, getPostThree, getPostTwo } from 'api/modules/api-app/general';
import { wait } from 'utilities/helper';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';

const NoreadScreen = () => {
    const [dataOne, setDataOne] = useState<any>([]);
    // const [dataTwo, setDataTwo] = useState<any>([]);
    // const [dataThree, setDataThree] = useState<any>([]);
    // const [dataFour, setDataFour] = useState<any>([]);
    // const [dataRandom, setDataRandom] = useState([]);
    const [dataAll, setDataAll] = useState<any>([[], [], []]);
    const [type, setType] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const getPost = async () => {
        try {
            const responsePosts = await getPostOne();
            setDataOne(responsePosts);
        } catch (error) {
            console.log(error);
        }
    };
    const getPosts = async () => {
        try {
            const responsePost = await getPostTwo();
            setDataTwo([responsePost]);
        } catch (error) {
            console.log(error);
        }
    };

    const getPostComment = async () => {
        try {
            const responsePost = await getPostThree();
            setDataThree(responsePost);
            // console.log(responsePost);
        } catch (error) {
            console.log(error);
        }
    };

    const getPostComments = async () => {
        try {
            const responsePost = await getPostFour();
            setDataFour(responsePost);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllData = async () => {
        try {
            const res = await Promise.all([getPostOne(), getPostFour(), getPostThree()]);
            setDataAll(res);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllData();
    }, []);

    useEffect(() => {
        getPost();
        getPosts();
        getPostComment();
        getPostComments();
    }, []);

    const handleRandom = () => {
        const randomIndexs: any = [];
        while (randomIndexs.length < 30) {
            const randomIndex = Math.floor(Math.random() * dataOne.length);
            randomIndexs.push(randomIndex);
        }
        const filtered = dataOne.filter((item: any, index: number) => {
            return randomIndexs.includes(index);
        });
        setDataRandom(filtered);
    };

    const handleRender = (propsItem: any) => {
        const { item } = propsItem;

        return (
            <View style={styles.cssItem} key={item.id}>
                <ItemAPI item={item} />
            </View>
        );
    };
    // const handleRenderTwo = ({ item }: any) => {
    //     return <ItemPlade item={item} />;
    // };
    // const handleRenderThree = ({ item }: any) => {
    //     return <ItemComment item={item} />;
    // };
    // const handleRenderFour = ({ item }: any) => {
    //     return <ItemComments item={item} />;
    // };
    const fakeCallAPI = () => {
        setIsLoading(true);
        wait(2000).then(() => {
            setIsLoading(false);
        });
    };
    return (
        <View style={styles.containerScreenTwo}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
                    <StyledButton title="Random" customStyle={styles.cssSubmit} onPress={handleRandom} />
                    <StyledButton title="Tab1" customStyle={styles.cssSubmit} onPress={() => setType(0)} />
                    <StyledButton title="Tab2" customStyle={styles.cssSubmit} onPress={() => setType(1)} />
                    <StyledButton title="Tab3" customStyle={styles.cssSubmit} onPress={() => setType(2)} />
                </View>
            </View>
            <StyledOverlayLoading visible={isLoading} />
            <StyledButton title="Long" customStyle={styles.cssSubmit} onPress={fakeCallAPI} />
            <StyledList data={dataAll[type]} renderItem={handleRender} />
        </View>
    );
};
const ItemAPI = ({ item }: any) => {
    return (
        <View>
            <View style={styles.cssId} key={item.id} />
            <StyledText originValue={item.title} />
            <StyledText originValue={item.body} />
        </View>
    );
};
// const ItemPlade = ({ item }: any) => {
//     return (
//         <View>
//             <StyledText originValue={item.title} />
//             <StyledText originValue={item.body} />
//         </View>
//     );
// };
// const ItemComment = ({ item }: any) => {
//     return (
//         <View>
//             <StyledText originValue={item.email} />
//             <StyledText originValue={item.body} />
//         </View>
//     );
// };

// const ItemComments = ({ item }: any) => {
//     // console.log(item.name);
//     return (
//         <View>
//             <StyledText originValue={item.name} />
//             <StyledText originValue={item.tittle} />
//         </View>
//     );
// };

const styles = ScaledSheet.create({
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
export default NoreadScreen;
