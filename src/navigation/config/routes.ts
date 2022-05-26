const AUTHENTICATE_ROUTE = {
    LOGIN: '@AUTHENTICATE_ROUTE/LOGIN',
    REGISTER: '@AUTHENTICATE_ROUTE/REGISTER',
    FORGOT_PASS: '@AUTHENTICATE_ROUTE/FORGOT_PASS',
    SEND_OTP: '@AUTHENTICATE_ROUTE/SEND_OTP',
    CHANGE_PASS: '@AUTHENTICATE_ROUTE/CHANGE_PASS',
    INTRO: 'INTRO',
    LOGINAPP: 'LOGINAPP',
    REGISTERAPP: 'REGISTERAPP',
};

const APP_ROUTE = {
    MAIN_TAB: 'MAIN_TAB',
};

const HOME_ROUTE = {
    ROOT: 'HOME_ROOT',
    HOME: 'HOME',
    HOME_DETAIL: 'HOME_DETAIL',
    WEB_VIEW: 'WEB_VIEW',
    HOME_DATA: 'HOME_DATA',
    HOME_USER_LIST: 'HOME_USER_LIST',
};

const SETTING_ROUTE = {
    ROOT: 'SETTING_ROOT',
};

const NOTIFICATION_ROUTE = {
    ROOT: 'NOTIFICATION_ROOT',
};

const ACCOUNT_ROUTE = {
    ROOT: 'ACCOUNT_ROUTE',
};

const TAB_NAVIGATION_ROOT = {
    HOME_ROUTE,
    SETTING_ROUTE,
    NOTIFICATION_ROUTE,
    ACCOUNT_ROUTE,
};

export { APP_ROUTE, TAB_NAVIGATION_ROOT, AUTHENTICATE_ROUTE };
