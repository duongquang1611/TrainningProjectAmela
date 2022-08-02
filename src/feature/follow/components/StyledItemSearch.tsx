import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledText } from '../../../components/base';

const StyledItemSearch = ({ item }: any) => {
    return (
        <>
            <View style={styles.cssRow}>
                <StyledText originValue={'ID:'} customStyle={{ color: 'red' }} />
                <StyledText originValue={item.id} />
            </View>
            <View style={styles.cssRow}>
                <StyledText originValue={'Name:'} customStyle={{ color: 'red' }} />
                <StyledText originValue={item.name} />
            </View>
            <View style={styles.cssRow}>
                <StyledText originValue={'Start-Date:'} customStyle={{ color: 'red' }} />
                <StyledText originValue={item.startDate} />
            </View>
            <View style={styles.cssRow}>
                <StyledText originValue={'Start-Time:'} customStyle={{ color: 'red' }} />
                <StyledText originValue={item.startTime} />
            </View>
            <View style={styles.cssRow}>
                <StyledText originValue={'End-Time:'} customStyle={{ color: 'red' }} />
                <StyledText originValue={item.endTime} />
            </View>
        </>
    );
};
const styles = ScaledSheet.create({
    cssRow: {
        flexDirection: 'row',
    },
});

export default StyledItemSearch;
