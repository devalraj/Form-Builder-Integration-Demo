import { axiosLoginEndpointInstance } from "./axios";


async function logoutUser() {
    let result = false;
    try {
        const response = await axiosLoginEndpointInstance.get("/logout");
        if (response.status == 200) {
            result = true;
        }
    } catch (error) {
        console.log(error);
    }
    return result;
}

export default logoutUser;