import axios from "./axios";

async function checkCurrentUser() {
    let result = false;
    try {
        const response = await axios.get("/formio/current");
        if (response.status == 200) {
            result = true;
        }
    } catch (error) {
        console.log(error);
    }
    return result;
}

export default checkCurrentUser;