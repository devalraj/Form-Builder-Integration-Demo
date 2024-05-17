import { FORMObject, isFORMObject } from "../types/formType";
import {axios} from "./axios";

async function updatedForm(data: FORMObject) {
    let success = false;
    try {
        const response = await axios.put(`/form/${data._id}`, data);
        if (isFORMObject(response.data) && response.data._id !== undefined) {
            success = true;
        }
    } catch (error) {
        console.log(error);
    }
    return success;
}

export default updatedForm;