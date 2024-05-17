import { FormBuilder } from "@formio/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JSONObject } from "../types/jsonType";
import getForm from "../api/getForm";
import createForm from "../api/createForm";
import { FORMObject } from "../types/formType";
import updatedForm from "../api/updateForm";

function initialeFormJSONObject() {
    return {
        title: "",
        display: "form",
        type: "form",
        name: "",
        path: "",
        components: []
    } as FORMObject;
}

function FormBuilderPage() {
    const params = useParams();
    const nav = useNavigate();
    const newForm = params["formName"] === undefined;
    const [formJSON, setFormJSON] = useState<FORMObject>(initialeFormJSONObject());

    // At Page initialization
    useEffect(() => {
        async function init(name: string) {
            const res = await getForm(name);
            setFormJSON(res);
        }
        if (params["formName"] != undefined) {
            init(params["formName"]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitHandler = async () => {
        // For Creating New Form
        if (newForm) {
            const flag = await createForm(formJSON);
            if (flag) {
                nav(`/builder/${formJSON.name}`);
            }
            else {
                console.log("Failure Handling");
            }
        }
        // For Updating Form
        else {
            const flag = await updatedForm(formJSON);
            if (flag) {
                console.log("Success Handling");
            }
            else {
                console.log("Failure Handling");
            }
        }
    }

    return (
        <>
            <div>
                <div>
                    <select value={formJSON.display} onChange={(e) => setFormJSON(prev => ({ ...prev, display: e.target.value }))}>
                        <option value="form">Form</option>
                        <option value="wizard">Wizard</option>
                    </select>
                </div>
                {newForm && (
                    <div>
                        <label>Title</label>
                        <input type="text" value={formJSON.title} onChange={(e) => {
                            const value = e.target.value;
                            const formattedValue = value.toLowerCase().replace(/\s/g, '');
                            setFormJSON(prev => ({ ...prev, title: value, name: formattedValue, path: formattedValue }));
                        }} />
                        <label>Name</label>
                        <input type="text" value={formJSON.name} disabled />
                        <label>Path</label>
                        <input type="text" value={formJSON.path} disabled />
                    </div>
                )}
            </div>
            <FormBuilder form={formJSON} onChange={(schema: JSONObject) => setFormJSON(prev => ({ ...prev, ...schema }))} />
            <div>
                <button onClick={submitHandler}>{newForm ? "Create Form" : "Save Form"}</button>
            </div>
        </>
    );
}

export default FormBuilderPage;