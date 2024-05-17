export type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;

export interface JSONObject {
    [x: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> { }

export function isJSONObject(obj: JSONValue): obj is JSONObject {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

export function isJSONArray(obj: JSONValue): obj is JSONArray {
    return Array.isArray(obj) && obj !== null;
}