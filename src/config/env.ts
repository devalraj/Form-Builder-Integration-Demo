type EnvType = {
  VITE_FORM_BUILDER: string;
  VITE_PROJECT_PATH: string;
};

export const env: EnvType = {
  VITE_FORM_BUILDER: import.meta.env.VITE_FORM_BUILDER ?? "",
  VITE_PROJECT_PATH: import.meta.env.VITE_PROJECT_PATH ?? ""
};