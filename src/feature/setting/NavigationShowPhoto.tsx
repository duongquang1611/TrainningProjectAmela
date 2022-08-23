import React from 'react';
import { View } from 'react-native';
import { StyledButton } from '../../components/base';
import { TAB_NAVIGATION_ROOT } from '../../navigation/config/routes';
import { navigate } from '../../navigation/NavigationService';

const NavigationShow = () => {
    return (
        <View style={{ flex: 1 }}>
            <StyledButton
                title="Navigation Show Cammera Roll"
                onPress={() => {
                    navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.CHAT);
                }}
                customStyle={{ marginTop: 50 }}
            />
        </View>
    );
};

export default NavigationShow;
