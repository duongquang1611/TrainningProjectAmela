import request from 'api/request';
import axios from 'axios';

export const getInit = (): Promise<any> => request.get(`/init`);
export const getResources = (): Promise<any> => request.get(`/resources`);
export const uploadImage = (formData: any): Promise<any> =>
    axios.post(`https://aos-api.test1.amelacorp.com/common/upload`, formData);
export const getPostOne = () => request.get(`posts`);
export const getPostTwo = () => request.get(`posts/1`);
export const getPostThree = () => request.get(`posts/1/comments`);
export const getPostFour = () => request.get(`comments?postId=1`);
export const getListTask = (params: any) => request.get(`task/list-task?`, params);
export const postAddTask = (params: any) => request.post(`v1/app/task/add`, params);
export const postSigup = (params: any) => request.post(`client-auth/register`, params);
export const putProfile = (params: any) => request.put(`v1/app/profile`, params);
export const putPass = (params: any) => request.put(`v1/app/auth/change-password`, params);
export const getSearchUser = (params: any) => request.get(`/v1/app/task/search-users`, params);
export const postAddDateTask = (params: any) => request.post(`/task/add`, params);
export const deleteTask = (taskId: number) => request.delete(`task/deleted-task/${taskId}`);
export const putUpdateTaskDate = (taskId: number, params: any) => request.put(`task/update-task/${taskId}`, params);
