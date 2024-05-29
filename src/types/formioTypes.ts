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

export interface PROJECTObject {
    _id: string;
    title: string;
    name: string;
    type: string;
    description: string;
    config: { [key: string]: string; };
}

export interface PROJECTArray extends Array<PROJECTObject> { }

export function isFORMObject(obj: FORMObject | JSONObject): obj is FORMObject {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null && (obj as FORMObject).name !== undefined;
}

export function isFORMArray(obj: FORMArray | JSONArray): obj is FORMArray {
    return Array.isArray(obj) && obj !== null;
}

export function isPROJECTObject(obj: PROJECTObject | FORMObject | JSONObject): obj is PROJECTObject {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null && (obj as PROJECTObject).config !== undefined;
}

export function isPROJECTArray(obj: PROJECTArray | FORMArray | JSONArray): obj is PROJECTArray {
    return Array.isArray(obj) && obj !== null;
}