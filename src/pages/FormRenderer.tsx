import { Form } from "@formio/react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config/config";
import { projectPath } from "../config/projectPathConfigurator";

function FormRendererPage() {
    const params = useParams();
    const nav = useNavigate();
    return (
        <>
            <div>
                <button onClick={() => nav(-1)}>Back</button>
            </div>
            <Form src={`${config.form_builder_url}/${projectPath.value}/${params["*"]}`} />
        </>
    );
}

export default FormRendererPage;