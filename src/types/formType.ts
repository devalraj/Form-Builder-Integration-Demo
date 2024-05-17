import { JSONArray, JSONObject } from "./jsonType";

export interface FORMObject {
    _id?: string;
    title: string;
    display: string;
    type: string;
    name: string;
    path: string;
    components: JSONArray
}

export interface FORMArray extends Array<FORMObject> { }

export function isFORMObject(obj: FORMObject | JSONObject): obj is FORMObject {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

export function isFORMArray(obj: FORMArray | JSONArray): obj is FORMArray {
    return Array.isArray(obj) && obj !== null;
}