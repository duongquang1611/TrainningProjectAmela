import React, { useCallback, useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { scale, ScaledSheet } from 'react-native-size-matters';
import ImageView from 'react-native-image-viewing';
import { checkCameraRoll } from '../../utilities/permissions';
import StyledHeader from '../../components/common/StyledHeader';
import StyledTouchable from '../../components/base/StyledTouchable';
import StyledList from '../../components/base/StyledList';

const Camera = () => {
    const [data, setData] = useState<any>([]);
    const [show, setShow] = useState(false);
    const [indexImage, setIndexImage] = useState(0);
    const getPhotos = async () => {
        const checkPermission = await checkCameraRoll();
        console.log(checkPermission);
        if (checkPermission) {
            CameraRoll.getPhotos({
                first: 50,
                groupTypes: 'All',
                assetType: 'Photos',
            })
                .then(res => {
                    return setData(res.edges);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        getPhotos();
    }, []);

    const renderItemImage = useCallback(({ index, item }: any) => {
        const handleShowImage = () => {
            setIndexImage(index);
            setShow(!show);
        };
        return (
            <StyledTouchable customStyle={{ width: '33%', height: scale(150) }} onPress={handleShowImage}>
                <Image
                    style={{
                        width: '100%',
                        height: scale(150),
                    }}
                    source={{ uri: item?.node?.image?.uri }}
                />
            </StyledTouchable>
        );
    }, []);

    const dataImage = React.useMemo(
        () =>
            data?.map((itemImg: any) => {
                return {
                    uri: itemImg?.node.image.uri,
                };
            }),
        [data],
    );

    return (
        <View style={styles.container}>
            <StyledHeader title="Camera Roll" />
            <ImageView
                images={dataImage}
                imageIndex={indexImage}
                visible={show}
                onRequestClose={() => setShow(false)}
                presentationStyle={'fullScreen'}
                swipeToCloseEnabled={show}
                animationType={'slide'}
            />
            <StyledList data={data} numColumns={3} renderItem={renderItemImage} />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    cssBtn: {
        marginVertical: '30@s',
    },
});
export default Camera;
