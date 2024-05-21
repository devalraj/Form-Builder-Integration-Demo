import { Form } from "@formio/react";
import { useParams } from "react-router-dom";
const baseURL = (import.meta.env.VITE_FORM_BUILDER) ? import.meta.env.VITE_FORM_BUILDER : '';
const projectName = (import.meta.env.VITE_PROJECT_NAME) ? import.meta.env.VITE_PROJECT_NAME : '';

function FormRendererPage() {
    const params = useParams();
    return (
        <>
            <Form src={`${baseURL}/${projectName}/${params["*"]}`} />
        </>
    );
}

export default FormRendererPage;