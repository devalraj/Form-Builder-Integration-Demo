import { Form } from "@formio/react";
import { JSONObject } from "../types/jsonType";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const baseURL = (import.meta.env.VITE_FORM_BUILDER) ? import.meta.env.VITE_FORM_BUILDER : '';

function LoginPage() {
    const nav = useNavigate();
    const { setIsLoggedIn } = useAuth();
    return (
        <>
            <div>
                <Form src={`${baseURL}/formio/user/login`} onSubmitDone={(data: JSONObject) => {
                    if (data["state"] == "submitted") {
                        setIsLoggedIn(true);
                        nav("/");
                    }
                }} />
            </div>
        </>
    );
}

export default LoginPage;