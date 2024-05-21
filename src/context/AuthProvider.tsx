import { createContext, useEffect, useState } from "react";
import { AuthContextType, AuthObject } from "../types/authObject";
import checkCurrentUser from "../api/checkCurrentUser";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function getorDefaultAuthObject() {
    const res = {} as AuthObject;
    res.formioUser = JSON.parse(localStorage.getItem("formioUser") ?? "{}");
    res.formioToken = localStorage.getItem("formioToken") ?? "";
    return res;
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [auth, setAuth] = useState<AuthObject>(getorDefaultAuthObject());
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        const init = async () => {
            const res = await checkCurrentUser();
            if (res === true) {
                setIsLoggedIn(true);
            }
            else {
                setAuth({ formioUser: {}, formioToken: "" });
            }
        };
        init();
    }, []);
    return (
        <AuthContext.Provider value={{ auth, setAuth, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;