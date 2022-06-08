import { AxiosRequestConfig } from 'axios';
import request from 'api/request';
import { store } from 'app-redux/store';
import { logger } from 'utilities/helper';
import { getProfile, login } from 'api/modules/api-app/authenticate';
import { useState } from 'react';
import AlertMessage from 'components/base/AlertMessage';
import { deleteTagOneSignal, pushTagMember } from 'utilities/notification';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { useDispatch } from 'react-redux';

const AUTH_URL_REFRESH_TOKEN = '/refreshToken';
export interface LoginRequestParams extends AxiosRequestConfig {
    email: string;
    password: string;
}

interface LoginRequest {
    loading: boolean;
    requestLogin: (values: any) => Promise<void>;
}

export const isLogin = () => {
    const { userInfo } = store.getState();
    return !!userInfo?.token;
};

const AuthenticateService = {
    refreshToken: (inputRefreshToken: string) =>
        request.post(AUTH_URL_REFRESH_TOKEN, {
            refresh_token: inputRefreshToken,
        }),
    logOut: () => {
        store.dispatch(userInfoActions.logOut());
        deleteTagOneSignal(); // chua can quan tam
    },
    handlerLogin: (token: Record<string, string>) => {
        // update to to redux
        const { userInfo } = store.getState();
        store.dispatch(userInfoActions.updateToken(token));
        pushTagMember(userInfo.user?.id as number); // chua can quan tam
    },
};

export const useLogin = (): LoginRequest => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const requestLogin = async (options: LoginRequestParams) => {
        try {
            setLoading(true);
            const response = await login(options);
            // store.dispatch(userInfoActions.getUserInfoRequest(response?.data?.token)); // get profile
            const responseProfile = await getProfile(response?.data.token);
            dispatch(userInfoActions.getUserInfoSuccess(responseProfile.data));
            AuthenticateService.handlerLogin({ ...response.data });
        } catch (e: any) {
            AlertMessage(e);
            logger(e);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        requestLogin,
    };
};

export default AuthenticateService;
