import axios, { InternalAxiosRequestConfig } from "axios";
const baseURL = import.meta.env.VITE_FORM_BUILDER ?? "";
const projectName = import.meta.env.VITE_PROJECT_NAME ?? "";

const headerAppender = function (config: InternalAxiosRequestConfig) {
    config.headers['x-jwt-token'] = localStorage.getItem("formioToken") ?? "";
    return config;
};

const axiosInstance = axios.create({
    baseURL: `${baseURL}/${projectName}`,
    headers: { "Content-Type": "application/json" }
});

const axiosLoginEndpointInstance = axios.create({
    baseURL: `${baseURL}/formio`,
    headers: { "Content-Type": "application/json" }
});

axiosInstance.interceptors.request.use(
    headerAppender
);

axiosLoginEndpointInstance.interceptors.request.use(
    headerAppender
);

export { axiosInstance as axios, axiosLoginEndpointInstance };