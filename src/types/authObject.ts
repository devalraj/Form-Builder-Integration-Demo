import { JSONObject } from "./jsonType";

export interface AuthObject {
    formioUser: JSONObject;
    formioToken: string;
}

export interface AuthContextType {
    auth: AuthObject;
    setAuth: React.Dispatch<React.SetStateAction<AuthObject>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}