import axios from 'axios';
import Config from 'react-native-config';
import TokenProvider from 'utilities/authenticate/TokenProvider';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { logger, renderAlert } from 'utilities/helper';
import NetInfo from '@react-native-community/netinfo';
import { apiLogger } from 'utilities/logger';
import { ERRORS } from 'utilities/staticData';
import i18next from 'utilities/i18next';

const AUTH_URL_REFRESH_TOKEN = `${Config.API_URL}client-auth/request-access-token`;
let hasAnyNetworkDialogShown = false;

// cấu hình axios
const request = axios.create({
    baseURL: 'https://training.test1.amelacorp.com' || Config.API_URL,
    timeout: 8000,
    headers: { Accept: '*/*' },
});
// for multiple requests
let isRefreshing = false;
let failedQueue: any = [];
// lưu lại những API chết khi có token mới gọi lại (401) và call lại
const processQueue = (error: any, token: string | null | undefined = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    console.log('failed', failedQueue);

    failedQueue = [];
};
console.log('processQueue', processQueue);

// (chưa hiểu)
const rejectError = (err: string, validNetwork: boolean) => {
    // Avoid being null
    if (validNetwork !== false) {
        return Promise.reject(i18next.t(err));
    }
    return Promise.reject(i18next.t(ERRORS.network));
};
// Request interceptor for API calls : yêu cầu đánh chặn cho các cuộc gọi API
request.interceptors.request.use(
    async (config: any) => {
        // Do something before API is sent
        const token = TokenProvider.getToken(); // lấy token từ userInfo kiểm tra
        console.log('token', token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // có token tiếp tục đăng nhập  config.Authorization : ủy quyền đăng nhập tiép
        }
        return config;
    },
    // Không có config từ request trả ra lỗi  và báo lỗi
    (error: any) => {
        // Do something with API error
        apiLogger(
            `%c FAILED ${error.response.method?.toUpperCase()} from ${error.response.config.url}:`,
            'background: red; color: #fff',
            error.response,
        );
        return Promise.reject(error);
    },
);
// Response interceptor for API calls : Trao đổi phản hồi cho các cuộc gọi API
request.interceptors.response.use(
    (response: any) => response.data,
    async (error: any) => {
        // Check network first
        const network: any = await NetInfo.fetch();
        const validNetwork = network.isInternetReachable && network.isConnected;
        // validNetwork on first render in iOS will return NULL
        if (validNetwork === false && !hasAnyNetworkDialogShown) {
            hasAnyNetworkDialogShown = true;
            renderAlert(i18next.t(ERRORS.network), () => {
                hasAnyNetworkDialogShown = false;
            });
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const { response } = error || {};
        const { data } = response || {};
        const { errorMessage, errorKey } = data || {};
        apiLogger(
            `%c FAILED ${error.config?.method?.toUpperCase()} from ${error?.config?.url}:`,
            'background: red; color: #fff',
            error.response,
        );
        const originalRequest = error.config; // cấu hình lỗi
        console.log('originalRequest', originalRequest);
        // check các trạng thái lỗi  của token cần refesh token
        if (errorMessage === 'RefreshToken_NotExist') {
            logger('RefreshToken_NotExist => logout');
            // Logout here
            AuthenticateService.logOut();
            return rejectError(error, validNetwork);
        }
        if (
            ((error.response && error.response.status === 401) || errorMessage === 'Token_Expire') &&
            !originalRequest.retry
        ) {
            if (isRefreshing) {
                try {
                    const queuePromise: any = await new Promise((resolve: any, reject: any) => {
                        failedQueue.push({ resolve, reject });
                    });
                    originalRequest.headers.Authorization = `Bearer ${queuePromise.token}`;
                    return request(originalRequest);
                } catch (err: any) {
                    return rejectError(err, validNetwork);
                }
            }
            logger('refreshing token...');
            originalRequest.retry = true;
            isRefreshing = true;
            // get token mới từ refesh token
            const localRefreshToken = TokenProvider.getRefreshToken(); // tạo 1 biến localRefreshToken lấy từ tokenProvider để lấy đc token mới nhất
            try {
                // call API refessh token
                const refreshTokenResponse = await axios.post(AUTH_URL_REFRESH_TOKEN, {
                    refreshToken: localRefreshToken, // gán refreshToken vào localRefreshToken
                });
                const { token, refreshToken } = refreshTokenResponse.data; // lấy token và refresh  từ refreshTokenResponse
                TokenProvider.setAllNewToken(token, refreshToken); // update token mới cho userInfo  lưu vào "(userInfoActions.updateToken)"
                originalRequest.headers.Authorization = `Bearer ${token}`; // ủy quyền truy cập với token mới
                processQueue(null, token); // call những API đã chết
                return request(originalRequest);
                // nếu get  token lỗi out app
            } catch (err) {
                // Logout here
                AuthenticateService.logOut();
                processQueue(err, null);
                return rejectError(err, validNetwork);
            } finally {
                isRefreshing = false;
            }
        }
        error.message = errorMessage || ERRORS.default;
        error.keyMessage = errorKey || '';
        return rejectError(error.message, validNetwork);
    },
);

export default request;
