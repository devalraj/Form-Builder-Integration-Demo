import config from "./config";

export interface ProjectPath {
    value: string;
    setValue: (newValue: string) => void;
}

export const projectPath: ProjectPath = {
    value: config.default_project_path,
    setValue(newValue: string) {
        projectPath.value = newValue;
    }
};