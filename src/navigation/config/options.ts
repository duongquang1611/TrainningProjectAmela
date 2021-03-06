import { Themes } from 'assets/themes';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { isIos } from 'utilities/helper';
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
    keyboardHandlingEnabled: isIos,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
        open: transition,
        close: transition,
    },
};

export default navigationConfigs;
