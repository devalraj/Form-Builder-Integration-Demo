import { Formio } from "formiojs";
import dataModel from "./swagger/dataModel.json"

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
                "calculateValue":"let jsonData = data.jsonData;\n\nconst suggestionsList = document.getElementById('html');\nfunction getObjectForKeyPath(obj, path) {\n    return path.split('.').reduce((acc, key) => key !== '' ? acc[key] : undefined, obj);\n}\n\nfunction showSuggestions(inputText) {\n    suggestionsList.innerHTML = '';\n    if (!inputText) {\n        return;\n    }\n    let keys = [];\n    const inputParts = inputText.split('.');\n    const currentLevel = inputParts.length - 1;\n    if (currentLevel === 0) {\n        keys = Object.keys(jsonData).filter(key =>\n            key.toLowerCase().startsWith(inputText.toLowerCase())\n        );\n    } else {\n        const selectedData = getObjectForKeyPath(jsonData, inputText.substring(0, inputText.lastIndexOf('.')));\n        if (selectedData && typeof selectedData === 'object') {\n            keys = Object.keys(selectedData).filter(key =>\n                key.toLowerCase().startsWith(inputParts[currentLevel].toLowerCase())\n            );\n        }\n    }\n    return keys.sort();\n}\n\nif(value && value!==null){\n  let keys = showSuggestions(value);\n  keys.sort().forEach(key => {\n    const p = document.createElement('p');\n    p.textContent = key;\n    suggestionsList.appendChild(p);\n  });\n}instance.parent.getComponent(\"key\").setValue(value);"
            },
            {
                "weight": 0,
                "type": "htmlelement",
                "tag": "div",
                "input": false,
                "key": "html",
                "label": "Suggestions",
                "attrs": [
                    {
                        "attr": "id",
                        "value": "{{component.key}}"
                    },
                    {
                        "attr": "style",
                        "value": "max-height: 200px; overflow-y: scroll;"
                    }
                ]
            },
            {
                "weight": 0,
                "label": "JSON Data",
                "key": "jsonData",
                "type": "hidden",
                "input": true,
                "defaultValue": dataModel
            },
            ...api.components
        ];
        Formio.Components.components[comp].editForm = function () {
            return editForm;
        }
    }
}