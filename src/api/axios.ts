import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
    baseURL: `${config.form_builder_url}`,
    headers: { "Content-Type": "application/json" }
});

axiosInstance.interceptors.request.use(
    function (axiosConfig) {
        console.log(axiosConfig.baseURL + "/" + axiosConfig.url);
        axiosConfig.headers['x-jwt-token'] = localStorage.getItem("formioToken") ?? "";
        return axiosConfig;
    }
);


export default axiosInstance;