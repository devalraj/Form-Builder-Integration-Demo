import { isPROJECTArray, PROJECTArray } from "../types/formioTypes";
import axios from "./axios";

async function getAllProjects(queryParams: string) {
    let result = [] as PROJECTArray;
    try {
        const response = await axios.get(`/project?${queryParams}`);
        if (isPROJECTArray(response.data)) {
            result = response.data;
        }
    } catch (error) {
        console.log(error);
    }
    return result;
}

export default getAllProjects;