import { Form } from "@formio/react";
import { JSONObject } from "../types/jsonType";
import { useNavigate } from "react-router-dom";
const baseURL = (import.meta.env.VITE_FORM_BUILDER) ? import.meta.env.VITE_FORM_BUILDER : '';

function LoginPage() {
    const nav = useNavigate();
    return (
        <>
            <div>
                <Form src={`${baseURL}/formio/user/login`} onSubmitDone={(data: JSONObject) => {
                    if (data["state"] == "submitted") {
                        nav("/builder");
                    }
                }} />
            </div>
        </>
    );
}

export default LoginPage;