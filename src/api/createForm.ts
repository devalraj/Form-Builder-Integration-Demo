import { projectPath } from "../config/projectPathConfigurator";
import { FORMObject, isFORMObject } from "../types/formioTypes";
import axios from "./axios";

async function createForm(data: FORMObject) {
    let created = false;
    try {
        const response = await axios.post(`${projectPath.value}/form`, data);
        if (isFORMObject(response.data) && response.data._id !== undefined) {
            created = true;
        }
    } catch (error) {
        console.log(error);
    }
    return created;
}

export default createForm;