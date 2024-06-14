import { Formio } from "formiojs";
import dataModel from "./swagger/dataModel.json"

function findComponents(components, target) {
    for (let i = 0; i < components.length; i++) {
        if (components[i].key === target)
            return components[i];
    }
    return undefined;
}

function getKeys(jsonData, prefix = '') {
    let keys = [];
    for (let key in jsonData) {
        if (typeof jsonData[key] === 'object') {
            keys = keys.concat(getKeys(jsonData[key], prefix + key + '.'));
        } else {
            keys.push(prefix + key);
        }
    }
    return keys;
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
                "type": "select",
                "input": true,
                "key": "keySetter",
                "label": "Key Setter",
                "dataSrc": "json",
                "dataType": "string",
                "tooltip": "This is used for setting up the Property Name",
                "data": {
                    "json": getKeys(dataModel)
                },
                "calculateValue": "instance.parent.getComponent(\"key\").setValue(value);"
            },
            ...api.components
        ];
        Formio.Components.components[comp].editForm = function () {
            return editForm;
        }
    }
}