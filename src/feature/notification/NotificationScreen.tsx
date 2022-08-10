import { StyledButton } from 'components/base';
import React, { FunctionComponent, useState } from 'react';
import { Switch, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import StyledSwitch from '../../components/base/StyledSwitch';

const NotificationScreen: FunctionComponent = () => {
    const [isActive, setIsActive] = useState(false);
    const toggleSwitch = () => setIsActive(previousState => !previousState);
    return (
        <View style={styles.container}>
            <StyledButton title={'Logout'} onPress={AuthenticateService.logOut} />
            <StyledSwitch
                size={300}
                isActive={isActive}
                onPress={() => {
                    setIsActive(!isActive);
                }}
                customStyle={styles.cssSwitch}
            />
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isActive ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isActive}
            />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    cssSwitch: {
        margin: '10@s',
    },
});
export default NotificationScreen;
