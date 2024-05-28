import { projectPath } from "../config/projectPathConfigurator";
import { FORMObject, isFORMObject } from "../types/formioTypes";
import axios from "./axios";

async function updatedForm(data: FORMObject) {
    let success = false;
    try {
        const response = await axios.put(`${projectPath.value}/form/${data._id}`, data);
        if (isFORMObject(response.data) && response.data._id !== undefined) {
            success = true;
        }
    } catch (error) {
        console.log(error);
    }
    return success;
}

export default updatedForm;