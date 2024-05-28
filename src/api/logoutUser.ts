import axios from "./axios";

async function logoutUser() {
    let result = false;
    try {
        const response = await axios.get("/formio/logout");
        if (response.status == 200) {
            result = true;
        }
    } catch (error) {
        console.log(error);
    }
    return result;
}

export default logoutUser;