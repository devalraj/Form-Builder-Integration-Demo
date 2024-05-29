import { Form } from "@formio/react";
import { JSONObject } from "../types/jsonType";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import config  from "../config/config";

function LoginPage() {
    const nav = useNavigate();
    const { setIsLoggedIn } = useAuth();
    return (
        <>
            <div>
                <Form src={`${config.form_builder_url}/formio/user/login`} onSubmitDone={(data: JSONObject) => {
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