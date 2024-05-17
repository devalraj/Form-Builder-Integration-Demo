import { FORMArray, isFORMArray } from "../types/formType";
import {axios} from "./axios";

async function getAllForms(queryParams: string) {
    let result = [] as FORMArray;
    try {
        const response = await axios.get(`/form?${queryParams}`);
        if (isFORMArray(response.data)) {
            result = response.data;
        }
    } catch (error) {
        console.log(error);
    }
    return result;
}

export default getAllForms;