import { useEffect, useState } from "react";
import ViewForms from "../components/ViewForms";
import config from "../config/config";
import { projectPath } from "../config/projectPathConfigurator";
import { PROJECTArray } from "../types/formioTypes";
import getAllProjects from "../api/getAllProjects";

export default function IndexPage() {
    const [project, setProject] = useState<string>(projectPath.value);
    const [projectList, setProjectList] = useState<PROJECTArray>([]);

    useEffect(() => {
        async function init() {
            const res = await getAllProjects(`select=title,name`);
            setProjectList(res);
        }
        init();
        return () => {
            projectPath.setValue(config.default_project_path);
        };
    }, []);

    useEffect(() => {
        projectPath.setValue(project);
    }, [project]);

    return (
        <>
            <div>
                <select value={project} onChange={(e) => setProject(e.target.value)}>
                    {projectList.map((item, idx) => <option key={`${idx}-${item._id}`} value={item.name}>{item.title}</option>)}
                </select>
            </div>
            <div key={project}>
                <ViewForms itemsPerPage={5} />
            </div>
        </>
    );
}
