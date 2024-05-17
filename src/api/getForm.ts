import { FORMObject, isFORMArray, isFORMObject } from "../types/formType";
import {axios} from "./axios";

async function getForm(name: string) {
    let result = {} as FORMObject;
    try {
        const response = await axios.get(`/form?name__regex=/^${name}/`);
        if (isFORMArray(response.data) && isFORMObject(response.data[0])) {
            result = response.data[0];
        }
    } catch (error) {
        console.log(error);
    }
    return result;
}

export default getForm;