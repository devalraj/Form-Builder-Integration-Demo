import {axiosLoginEndpointInstance} from "./axios";

async function checkCurrentUser() {
    let result = false;
    try {
        const response = await axiosLoginEndpointInstance.get("/current");
        if (response.status == 200) {
            result = true;
        }
    } catch (error) {
        console.log(error);
    }
    return result;
}

export default checkCurrentUser;