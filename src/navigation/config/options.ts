import { Themes } from 'assets/themes';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { Platform } from 'react-native';
import transition from './transition';

const navigationConfigs = {
    cardStyle: {
        backgroundColor: Themes.COLORS.white,
        // paddingBottom: Metrics.safeBottomPadding,
    },
    headerShown: false,
    gestureEnabled: true,
    // gestureDirection: 'default',
    cardShadowEnabled: true,
    cardOverlayEnabled: true,
    keyboardHandlingEnabled: Platform.OS === 'ios',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
        open: transition,
        close: transition,
    },
};

export default navigationConfigs;
