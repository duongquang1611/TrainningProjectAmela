import { StyledButton } from 'components/base';
import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';

// const data = [
//     { id: 1, name: 'One' },
//     { id: 2, name: 'Two' },
//     { id: 3, name: 'Three' },
//     { id: 4, name: 'Four' },
// ];
const NotificationScreen: FunctionComponent = () => {
    // const [arraySelected, setArraySelected] = useState<any>([]);
    return (
        <View style={styles.container}>
            {/* <StyledListViewSelected
                customStyle={{}}
                data={data}
                arraySelected={arraySelected}
                isMultiple={true}
                setArraySelected={(array: any) => setArraySelected(array)}
            /> */}
            <StyledButton title={'Logout'} onPress={AuthenticateService.logOut} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default NotificationScreen;
