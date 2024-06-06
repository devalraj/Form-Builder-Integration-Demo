import { FormBuilder } from "@formio/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { JSONObject } from "../types/jsonType";
import getForm from "../api/getForm";
import createForm from "../api/createForm";
import { Builder, FORMObject } from "../types/formioTypes";
import updatedForm from "../api/updateForm";
import ToggleButton from "../components/prebuilt-formio-components/Toggle.json";
import Forms from "../components/prebuilt-formio-components/Forms.json";
// import getAllForms from "../api/getAllForms";

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

function initialOptionsObject() {
    const temp: Builder = {
        builder: {
            custom: {
                title: "Custom Components",
                weight: 10,
                components: {
                    togglebutton: ToggleButton
                }
            }
        }
    };
    return temp;
}

function FormBuilderPage() {
    const params = useParams();
    const nav = useNavigate();
    const newForm = params["formName"] === undefined;
    const [formJSON, setFormJSON] = useState<FORMObject>(initialeFormJSONObject());
    const [options, setOptions] = useState<Builder>(initialOptionsObject());

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
        const flag = newForm ? await createForm(formJSON) : await updatedForm(formJSON);
        if (flag) {
            if (newForm) {
                nav(`/builder/${formJSON.name}`);
                return;
            }
            console.log("Success Handling");
        }
        else {
            console.log("Failure Handling");
        }
    }

    const formHandler = (formType: string) => {

        // async function init() {
        //     const response = await getAllForms('type=form');
        //     const temp = {};
        //     response.forEach(form => {
        //         temp[form.name] = {
        //             title: form.title,
        //             key: form.name,
        //             schema: {
        //                 components: form.components
        //             }
        //         };
        //     });
        //     setOptions(prev => ({
        //         ...prev,
        //         builder: {
        //             forms: {
        //                 title: "Prebuilt Forms",
        //                 weight: 10,
        //                 components: temp
        //             }
        //         }
        //     }));
        // }
        // init();

        const updatedOptions: Builder = formType === "wizard" ?
            {
                builder: {
                    basic: false,
                    custom: false,
                    advanced: false,
                    layout: false,
                    data: false,
                    premium: false,
                    forms: {
                        title: "Prebuilt Forms",
                        weight: 10,
                        components: {
                            login: Forms

                        }
                    }
                }
            } :
            initialOptionsObject();
        setOptions(updatedOptions);
        setFormJSON(prev => ({ ...prev, display: formType }))
    }

    return (
        <>
            <div>
                <div>
                    <select value={formJSON.display} onChange={(e) => formHandler(e.target.value)}>
                        <option value="form">Form</option>
                        <option value="wizard">Wizard</option>
                    </select>
                </div>
                <div>
                    <label>Title</label>
                    {newForm ?
                        <input type="text" value={formJSON.title} onChange={(e) => {
                            const value = e.target.value;
                            const formattedValue = value.toLowerCase().replace(/\s/g, '');
                            setFormJSON(prev => ({ ...prev, title: value, name: formattedValue, path: formattedValue }));
                        }} />
                        :
                        <input type="text" value={formJSON.title} disabled />
                    }
                    <label>Name</label>
                    <input type="text" value={formJSON.name} disabled />
                    <label>Path</label>
                    <input type="text" value={formJSON.path} disabled />
                    {!newForm && <Link to={`/renderer/${formJSON.path}`}>Preview</Link>}
                </div>
            </div>
            <FormBuilder key={formJSON.display} form={formJSON} onChange={(schema: JSONObject) => setFormJSON(prev => ({ ...prev, ...schema }))} options={options} />
            <div>
                <button onClick={submitHandler}>{newForm ? "Create Form" : "Save Form"}</button>
            </div>
        </>
    );
}

export default FormBuilderPage;