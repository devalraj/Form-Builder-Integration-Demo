import { projectPath } from "../config/projectPathConfigurator";
import { FORMArray, isFORMArray } from "../types/formioTypes";
import axios from "./axios";

async function getAllForms(queryParams: string) {
    let result = [] as FORMArray;
    try {
        const response = await axios.get(`${projectPath.value}/form?${queryParams}`);
        if (isFORMArray(response.data)) {
            result = response.data;
        }
    } catch (error) {
        console.log(error);
    }
    return result;
}

export default getAllForms;