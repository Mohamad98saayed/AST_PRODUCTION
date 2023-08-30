import axiosConf from "../../../utils/axiosConf";
const baseUrl = "/user";

export interface SignupUser {
    name: string,
    email: string,
    password: string,
    image: string,
}

export interface SigninUser {
    email: string,
    password: string,
}

export const signup = async (userData: SignupUser) => {
    const response = await axiosConf.post(baseUrl + "/signup", userData);
    return response.data;
};

export const signin = async (userData: SigninUser) => {
    const response = await axiosConf.post(baseUrl + "/signin", userData);
    return response.data;
};

export const signout = async () => {
    const response = await axiosConf.get(baseUrl + "/signout");
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axiosConf.get(baseUrl + "/current");
    return response.data;
};
