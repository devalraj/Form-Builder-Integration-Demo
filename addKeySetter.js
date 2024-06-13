import { Formio } from "formiojs";

function findComponents(components, target) {
    for (let i = 0; i < components.length; i++) {
        if (components[i].key === target)
            return components[i];
    }
    return undefined;
}

for (let comp in Formio.Components.components) {
    if (comp !== "unknown" && Formio.Components.components[comp].editForm !== undefined) {
        const editForm = Formio.Components.components[comp].editForm();
        const tabs = findComponents(editForm.components, "tabs");
        if (tabs === undefined)
            continue;
        const api = findComponents(tabs.components, "api");
        if (api === undefined)
            continue;
        api.components[0].disabled = true;
        api.components[0].validate = {
            "required": true,
            "custom": "if (input !== \"\") {\n  valid = /^\\w[\\w.-]*\\w$/.test(input) ? true : \"The property name must only contain alphanumeric characters, underscores, dots and dashes and should not be ended by dash or dot.\";\n}"
        };
        api.components = [
            {
                "weight": 0,
                "type": "textfield",
                "input": true,
                "key": "keySetter",
                "label": "Key Setter",
                "tooltip": "This is used for setting up the Property Name",
                "calculateValue": "instance.parent.getComponent(\"key\").setValue(value);"
            },
            ...api.components
        ];
        Formio.Components.components[comp].editForm = function () {
            return editForm;
        }
    }
}