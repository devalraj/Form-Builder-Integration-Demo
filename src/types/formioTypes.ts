import { JSONArray, JSONObject } from "./jsonType";

export interface Action {
    name: string;
    type: string;
    customAction?: string;
    content?: string;
    property?: {
        label: string;
        value: string;
        type: string;
    },
    state?: boolean;
}

export interface ActionArray extends Array<Action> { }

export interface Attr {
    attr: string;
    value: string;
}

export interface AttrArray extends Array<Attr> { }


export interface Logic {
    name: string;
    trigger: {
        type: string;
        event?: string;
        javascript?: string;
    },
    actions: ActionArray;
}

export interface LogicArray extends Array<Logic> { }

export interface FORMObject {
    _id?: string;
    label?: string;
    logic?: LogicArray;
    title?: string;
    display?: string;
    type?: string;
    name?: string;
    path?: string;
    components?: FORMArray;
    tag?: string;
    attr?: AttrArray;
    content?: string;
    refreshOnChange?: boolean;
    input?: boolean;
    tableView?: boolean;
    key?: string;
}

export interface CustomComponentObject {
    title: string;
    weight: number;
    components: { [key: string]: CustomComponent; };
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

export interface Builder {
    alwaysConfirmComponentRemoval?: boolean;
    noDefaultSubmitButton?: boolean;
    builder: {
        custom?: boolean | CustomComponentObject;
        basic?: boolean;
        advanced?: boolean;
        layout?: boolean;
        data?: boolean;
        premium?: boolean;
        forms?: boolean | CustomComponentObject;
    }
}

export interface CustomComponent {
    title: string;
    key: string;
    icon: string;
    schema: FORMObject;
}

export interface CustomComponentArray extends Array<CustomComponent> { }

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