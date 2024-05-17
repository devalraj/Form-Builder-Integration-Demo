import { Form } from "@formio/react";
import { useEffect, useState } from "react";
import { FORMArray } from "../types/formType";
import getAllForms from "../api/getAllForms";
const baseURL = (import.meta.env.VITE_FORM_BUILDER) ? import.meta.env.VITE_FORM_BUILDER : '';
const projectName = (import.meta.env.VITE_PROJECT_NAME) ? import.meta.env.VITE_PROJECT_NAME : '';

function FormRendererPage() {
    const [formList, setFormList] = useState<FORMArray>([]);
    const [skip, setSkip] = useState<number>(0);
    const [idx, setIdx] = useState<number>(-1);

    useEffect(() => {
        async function init() {
            const res = await getAllForms(`type=form&select=title,path&limit=5&skip=${skip}`);
            setFormList(res);
        }
        init();
    }, [skip]);


    return (
        <>
            <div>
                <button onClick={() => setSkip(prev => prev >= 5 ? prev - 5 : 0)}>Previous</button>
                {formList.map((item, i) => <button key={`${item.title}-${i}`} onClick={() => setIdx(prev => (prev == i) ? -1 : i)}>{item.title}</button>)}
                <button onClick={() => setSkip(prev => prev + 5)}>Next</button>
            </div>
            {idx != -1 && <Form src={`${baseURL}/${projectName}/${formList[idx].path}`} />}
        </>
    );
}

export default FormRendererPage;