import request from 'api/request';

export const getInit = (): Promise<any> => request.get(`/init`);
export const getResources = (): Promise<any> => request.get(`/resources`);
export const uploadImage = (formData: any): Promise<any> => request.post(`upload/image`, formData);
export const getPostOne = () => request.get(`posts`);
export const getPostTwo = () => request.get(`posts/1`);
export const getPostThree = () => request.get(`posts/1/comments`);
export const getPostFour = () => request.get(`comments?postId=1`);
export const getListTask = (params: any) => request.get(`v1/app/task/list`, params);
export const postAddTask = (params: any) => request.post(`v1/app/task/add`, params);
export const postSigup = (params: any) => request.post(`/v1/app/auth/signup`, params);
export const putProfile = (params: any) => request.put(`v1/app/profile`, params);
export const getSearchUser = (params: any) => request.get(`/v1/app/task/search-users`, params);
// export const getProfileUser = () => request.get(`v1/app/profile`);
export const putUpdateTask = (taskId: number | string, params: any) =>
    request.put(`v1/app/task/update/${taskId}`, params);
